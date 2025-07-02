const User = require("../../models/User");
const {
  generateTokens,
  generateEmailToken,
} = require("../../utils/tokenUtils");
const { hashPassword, comparePassword } = require("../../utils/hashUtils");
const { sendVerificationEmail } = require("../emailService");

const registerUser = async ({
  email,
  phone,
  password,
  firstName,
  lastName,
}) => {
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) throw new Error("Email or phone already in use");

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    email,
    phone,
    passwordHash,
    firstName,
    lastName,
    isVerified: false,
    provider: "local",
  });

  const emailToken = generateEmailToken(user._id);
  await sendVerificationEmail(user.email, emailToken);
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || user.provider !== "local")
    throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.passwordHash);
  if (!match) throw new Error("Invalid credentials");
  if (!user.isVerified) throw new Error("Please verify your email");

  return generateTokens(user);
};

module.exports = {
  registerUser,
  loginUser,
};
