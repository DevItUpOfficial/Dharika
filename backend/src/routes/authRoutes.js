const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);
router.get("/verify-email/:token", authController.verifyEmail);

module.exports = router;
