const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/emailService");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
function generateTokens(user) {
  const payload = { userId: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

// Email/Password Signup
exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      provider: "local",
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
      .json({ message: "Signup successful. Please verify your email." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
};

//Email Verification
exports.verifyEmail = async (req, res) => {
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

//Email/Password Sign-in
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

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

//Google Sign-in
exports.googleLogin = async (req, res) => {
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

// Resend Verification Email
exports.resendVerification = async (req, res) => {
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
