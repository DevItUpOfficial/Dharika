const authService = require("../services/auth");

const register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res
      .status(201)
      .json({ message: "Registration successful. Please verify your email." });
  } catch (err) {
    res.status(400).json({ error: err.message || "Registration failed" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    await authService.verifyUserEmail(req.params.token);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid or expired token" });
  }
};

const login = async (req, res) => {
  try {
    const tokens = await authService.loginUser(req.body);
    res.status(200).json({ message: "Login successful", ...tokens });
  } catch (err) {
    res.status(401).json({ error: err.message || "Login failed" });
  }
};

const googleLogin = async (req, res) => {
  try {
    const tokens = await authService.googleLogin(req.body.idToken);
    res.status(200).json({ message: "Google login successful", ...tokens });
  } catch (err) {
    res.status(400).json({ error: err.message || "Google login failed" });
  }
};

const resendVerification = async (req, res) => {
  try {
    await authService.resendVerificationEmail(req.body.email);
    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Resend failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await authService.updateUserProfile(
      req.user.userId,
      req.body
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message || "Update failed" });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const token = await authService.requestPasswordReset(req.body.email);
    if (!token) {
      return res
        .status(200)
        .json({ message: "If this email exists, a reset link was sent." });
    }
    res.status(200).json({
      message: "Reset link sent to email",
      resetLink: `http://localhost:3000/api/auth/reset-password?token=${token}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Could not generate reset token" });
  }
};

const resetPassword = async (req, res) => {
  try {
    await authService.resetUserPassword(req.body.token, req.body.newPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Reset failed" });
  }
};

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
