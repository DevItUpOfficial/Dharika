const jwt = require("jsonwebtoken");

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

const generateEmailToken = (userId) => {
  return jwt.sign({ userId }, process.env.EMAIL_VERIFICATION_SECRET, {
    expiresIn: "1d",
  });
};

const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.RESET_PASSWORD_SECRET, {
    expiresIn: "15m",
  });
};

const verifyToken = (token, secret) => jwt.verify(token, secret);

module.exports = {
  generateTokens,
  generateEmailToken,
  generateResetToken,
  verifyToken,
};
