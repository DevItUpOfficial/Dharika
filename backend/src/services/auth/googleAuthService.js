const User = require("../../models/User");
const { OAuth2Client } = require("google-auth-library");
const { generateTokens } = require("../../utils/tokenUtils");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, sub: googleId, given_name, family_name } = ticket.getPayload();
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

  return generateTokens(user);
};

module.exports = {
  googleLogin,
};
