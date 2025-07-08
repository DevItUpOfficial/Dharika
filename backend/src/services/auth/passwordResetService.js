const User = require("../../models/User");
const { generateResetToken, verifyToken } = require("../../utils/tokenUtils");
const { hashPassword } = require("../../utils/hashUtils");

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  return generateResetToken(user._id);
};

const resetUserPassword = async (token, newPassword) => {
  const { userId } = verifyToken(token, process.env.RESET_PASSWORD_SECRET);
  const passwordHash = await hashPassword(newPassword);
  await User.findByIdAndUpdate(userId, { passwordHash });
};

module.exports = {
  requestPasswordReset,
  resetUserPassword,
};
