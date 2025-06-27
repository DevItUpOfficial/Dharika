const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/emailService");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateTokens = (user) => {
  const payload = { userId: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

// POST /auth/signup
const register = async (req, res) => {
  try {
    const { email, phone, password, firstName, lastName } = req.body;

    if (!email || !phone || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser)
      return res.status(409).json({ error: "Email or phone already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      phone,
      passwordHash,
      firstName,
      lastName,
      isVerified: false,
    });

    const emailToken = jwt.sign(
      { userId: user._id },
      process.env.EMAIL_VERIFICATION_SECRET,
      { expiresIn: "1d" }
    );

    await sendVerificationEmail(user.email, emailToken);

    res
      .status(201)
      .json({ message: "Registration successful. Please verify your email." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// GET /auth/verify-email/:token
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const { userId } = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );
    if (!user) return res.status(400).json({ error: "Invalid token" });
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verification Error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

// POST /auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.provider !== "local")
      return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ error: "Please verify your email" });

    const tokens = generateTokens(user);
    res.status(200).json({ message: "Login successful", ...tokens });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// POST /auth/google-login
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "ID token required" });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, sub: googleId, given_name, family_name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        googleId,
        firstName: given_name,
        lastName: family_name,
        isVerified: true,
        provider: "google",
      });
    }

    const tokens = generateTokens(user);
    res.status(200).json({ message: "Google login successful", ...tokens });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(400).json({ error: "Google login failed" });
  }
};

// POST /auth/resend-verification
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ error: "Email is already verified" });

    const emailToken = jwt.sign(
      { userId: user._id },
      process.env.EMAIL_VERIFICATION_SECRET,
      { expiresIn: "1d" }
    );

    await sendVerificationEmail(user.email, emailToken);

    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (err) {
    console.error("Resend Verification Error:", err);
    res.status(500).json({ error: "Could not resend verification email" });
  }
};

// PUT /auth/update-profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, phone } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Profile updated", user: updated });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ error: "Could not update profile" });
  }
};

// POST /auth/reset-password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const { userId } = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const passwordHash = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(userId, { passwordHash });

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "If this email exists, a reset link was sent." });
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    // console.log("🔑 Reset token:", resetToken);

    res.status(200).json({
      message: "Reset link sent to email",
      resetLink: `http://localhost:3000/api/auth/reset-password?token=${resetToken}`, // For dev
    });
  } catch (err) {
    console.error("Request Reset Error:", err);
    res.status(500).json({ error: "Could not generate reset token" });
  }
};

// Export all functions
module.exports = {
  register,
  verifyEmail,
  login,
  googleLogin,
  resendVerification,
  updateProfile,
  requestPasswordReset,
  resetPassword,
};
