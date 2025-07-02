const User = require("../../models/User");
const { generateEmailToken, verifyToken } = require("../../utils/tokenUtils");
const { sendVerificationEmail } = require("../emailService");

const verifyUserEmail = async (token) => {
  const { userId } = verifyToken(token, process.env.EMAIL_VERIFICATION_SECRET);
  const user = await User.findByIdAndUpdate(
    userId,
    { isVerified: true },
    { new: true }
  );
  if (!user) throw new Error("Invalid token");
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.isVerified) throw new Error("Email is already verified");

  const token = generateEmailToken(user._id);
  await sendVerificationEmail(email, token);
};

module.exports = {
  verifyUserEmail,
  resendVerificationEmail,
};
