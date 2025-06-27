const WishlistCollaborator = require('../../models/WishlistCollaborator');

//Add a new collaborator to a wishlist
const addCollaborator = async (wishlistId, userId, canEdit = false) => {
  const existing = await WishlistCollaborator.findOne({ wishlistId, userId });

  if (existing) {
    throw new Error('User is already a collaborator');
  }

  const collaborator = new WishlistCollaborator({
    wishlistId,
    userId,
    canEdit,
  });

  return await collaborator.save();
};

//Remove a collaborator from a wishlist
const removeCollaborator = async (id) => {
  const collab = await WishlistCollaborator.findById(id);
  if (!collab) {
    throw new Error('Collaborator not found');
  }
  return await collab.deleteOne();
};

//Update collaborator's permissions
const updatePermissions = async (id, canEdit) => {
  const updated = await WishlistCollaborator.findByIdAndUpdate(
    id,
    { canEdit },
    { new: true }
  );

  if (!updated) {
    throw new Error('Failed to update collaborator permissions');
  }

  return updated;
};

module.exports = {
  addCollaborator,
  removeCollaborator,
  updatePermissions,
};
