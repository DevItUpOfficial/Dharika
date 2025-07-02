const WishlistCollaborator = require('../../models/WishlistCollaborator');
const Wishlist = require('../../models/Wishlist');

// Internal helper to check if current user is allowed to modify collaborators
const isAuthorized = async (wishlistId, reqUser) => {
  if (reqUser.role === 'admin') return true;

  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  return wishlist.userId.toString() === reqUser.userId;
};

// Add a new collaborator to a wishlist
const addCollaborator = async (wishlistId, userIdToAdd, canEdit = false, reqUser) => {
  const allowed = await isAuthorized(wishlistId, reqUser);
  if (!allowed) throw new Error('Unauthorized to add collaborator');

  const existing = await WishlistCollaborator.findOne({ wishlistId, userId: userIdToAdd });
  if (existing) throw new Error('User is already a collaborator');

  const collaborator = new WishlistCollaborator({
    wishlistId,
    userId: userIdToAdd,
    canEdit,
  });

  return await collaborator.save();
};

// Remove a collaborator from a wishlist
const removeCollaborator = async (collabId, reqUser) => {
  const collab = await WishlistCollaborator.findById(collabId);
  if (!collab) throw new Error('Collaborator not found');

  const allowed = await isAuthorized(collab.wishlistId, reqUser);
  if (!allowed) throw new Error('Unauthorized to remove collaborator');

  return await collab.deleteOne();
};

// Update a collaborator's permissions
const updatePermissions = async (collabId, canEdit, reqUser) => {
  const collab = await WishlistCollaborator.findById(collabId);
  if (!collab) throw new Error('Collaborator not found');

  const allowed = await isAuthorized(collab.wishlistId, reqUser);
  if (!allowed) throw new Error('Unauthorized to update collaborator');

  return await WishlistCollaborator.findByIdAndUpdate(
    collabId,
    { canEdit },
    { new: true }
  );
};

module.exports = {
  addCollaborator,
  removeCollaborator,
  updatePermissions,
};
