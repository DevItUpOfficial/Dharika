const WishlistCollaborator = require('../../models/WishlistCollaborator');
const Wishlist = require('../../models/Wishlist');

// Internal helper to check if current user is allowed to modify collaborators
const isAuthorized = async (wishlistId, currentUserId, role) => {
  if (role === 'admin') return true;

  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  return wishlist.userId.toString() === currentUserId;
};

// Add a new collaborator to a wishlist
const addCollaborator = async (wishlistId, userIdToAdd, canEdit = false, currentUserId, role) => {
  const allowed = await isAuthorized(wishlistId, currentUserId, role);
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
const removeCollaborator = async (collabId, currentUserId, role) => {
  const collab = await WishlistCollaborator.findById(collabId);
  if (!collab) throw new Error('Collaborator not found');

  const allowed = await isAuthorized(collab.wishlistId, currentUserId, role);
  if (!allowed) throw new Error('Unauthorized to remove collaborator');

  return await collab.deleteOne();
};

// Update a collaborator's permissions
const updatePermissions = async (collabId, canEdit, currentUserId, role) => {
  const collab = await WishlistCollaborator.findById(collabId);
  if (!collab) throw new Error('Collaborator not found');

  const allowed = await isAuthorized(collab.wishlistId, currentUserId, role);
  if (!allowed) throw new Error('Unauthorized to update collaborator');

  const updated = await WishlistCollaborator.findByIdAndUpdate(
    collabId,
    { canEdit },
    { new: true }
  );

  return updated;
};

module.exports = {
  addCollaborator,
  removeCollaborator,
  updatePermissions,
};
