const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const requireAuth = require("../middleware/auth"); // if you have auth middleware

// POST /auth/signup
router.post("/signup", authController.register);

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/google-login
router.post("/google-login", authController.googleLogin);

// GET /auth/verify-email/:token
router.get("/verify-email/:token", authController.verifyEmail);

// POST /auth/resend-verification
router.post("/resend-verification", authController.resendVerification);

// PUT /auth/update-profile (protected route)
router.put("/update-profile", requireAuth, authController.updateProfile);

// POST /auth/reset-password-reset
router.post("/request-password-reset", authController.requestPasswordReset);
// POST /auth/reset-password
router.post("/reset-password", authController.resetPassword);

module.exports = router;