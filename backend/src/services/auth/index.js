const { registerUser, loginUser } = require("./localAuthService");
const { googleLogin } = require("./googleAuthService");
const {
  verifyUserEmail,
  resendVerificationEmail,
} = require("./emailVerificationService");
const {
  requestPasswordReset,
  resetUserPassword,
} = require("./passwordResetService");
const { updateUserProfile } = require("./profileService");

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  verifyUserEmail,
  resendVerificationEmail,
  requestPasswordReset,
  resetUserPassword,
  updateUserProfile,
};
