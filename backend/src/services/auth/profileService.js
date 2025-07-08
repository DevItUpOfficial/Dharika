const User = require("../../models/User");

const updateUserProfile = async (userId, { firstName, lastName, phone }) => {
  return await User.findByIdAndUpdate(
    userId,
    { firstName, lastName, phone },
    { new: true }
  );
};

module.exports = {
  updateUserProfile,
};
