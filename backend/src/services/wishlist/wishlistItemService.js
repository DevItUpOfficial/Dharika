const Wishlist = require('../../models/Wishlist');
const WishlistItem = require('../../models/WishlistItem');
const WishlistCollaborator = require('../../models/WishlistCollaborator');

// Get all items for a wishlist (respecting public/private access)
const getByWishlist = async (wishlistId, userId) => {
  const wishlist = await Wishlist.findById(wishlistId);

  if (!wishlist) throw new Error('Wishlist not found');

  if (!wishlist.isPublic) {
    const isOwner = String(wishlist.userId) === String(userId);
    const isCollaborator = await WishlistCollaborator.exists({ wishlistId, userId });

    if (!isOwner && !isCollaborator) {
      throw new Error('Access denied to private wishlist items');
    }
  }

  return await WishlistItem.find({ wishlistId }).populate('productId addedBy');
};

// Add an item to wishlist (owner or collaborator with edit rights)
const add = async (wishlistId, productId, userId) => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  const isOwner = String(wishlist.userId) === String(userId);

  let canEdit = false;

  if (wishlist.isCollaborative && !isOwner) {
    const collab = await WishlistCollaborator.findOne({ wishlistId, userId });
    if (collab?.canEdit) {
      canEdit = true;
    }
  }

  if (!isOwner && !canEdit) {
    throw new Error('Not authorized to add items to this wishlist');
  }

  const existing = await WishlistItem.findOne({ wishlistId, productId });
  if (existing) {
    throw new Error('Product already exists in wishlist');
  }

  const item = new WishlistItem({
    wishlistId,
    productId,
    addedBy: userId,
  });

  return await item.save();
};

// Remove item (owner or collaborator with edit rights)
const remove = async (itemId, userId) => {
  const item = await WishlistItem.findById(itemId);
  if (!item) throw new Error('Wishlist item not found');

  const wishlist = await Wishlist.findById(item.wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  const isOwner = String(wishlist.userId) === String(userId);

  let canEdit = false;

  if (wishlist.isCollaborative && !isOwner) {
    const collab = await WishlistCollaborator.findOne({ wishlistId: wishlist._id, userId });
    if (collab?.canEdit) {
      canEdit = true;
    }
  }

  if (!isOwner && !canEdit) {
    throw new Error('Not authorized to remove items from this wishlist');
  }

  return await item.deleteOne();
};

module.exports = {
  getByWishlist, // Anyone if wishlist is public, else only owner or collaborators
  add,           // Only owner or collaborators (with canEdit) if collaborative
  remove,        // Only owner or collaborators (with canEdit) if collaborative
};