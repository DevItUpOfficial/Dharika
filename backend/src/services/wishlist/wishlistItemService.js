const Wishlist = require('../../models/Wishlist');
const WishlistItem = require('../../models/WishlistItem');
const WishlistCollaborator = require('../../models/WishlistCollaborator');

// Helper: Check if user can edit the wishlist (owner or collaborator with canEdit)
const canEditWishlist = async (wishlist, reqUser) => {
  if (reqUser.role === 'admin') return true;

  const isOwner = String(wishlist.userId) === String(reqUser.userId);
  if (isOwner) return true;

  if (wishlist.isCollaborative) {
    const collab = await WishlistCollaborator.findOne({
      wishlistId: wishlist._id,
      userId: reqUser.userId,
    });
    return !!(collab?.canEdit);
  }

  return false;
};

// Get all items for a wishlist (respecting public/private access)
const getByWishlist = async (wishlistId, reqUser) => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  if (!wishlist.isPublic && reqUser.role !== 'admin') {
    const isOwner = String(wishlist.userId) === String(reqUser.userId);
    const isCollaborator = await WishlistCollaborator.exists({
      wishlistId,
      userId: reqUser.userId,
    });

    if (!isOwner && !isCollaborator) {
      throw new Error('Access denied to private wishlist items');
    }
  }

  return await WishlistItem.find({ wishlistId }).populate('productId addedBy');
};

// Add an item to wishlist (owner or collaborator with edit rights)
const add = async (wishlistId, productId, reqUser) => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  const authorized = await canEditWishlist(wishlist, reqUser);
  if (!authorized) {
    throw new Error('Not authorized to add items to this wishlist');
  }

  const existing = await WishlistItem.findOne({ wishlistId, productId });
  if (existing) {
    throw new Error('Product already exists in wishlist');
  }

  const item = new WishlistItem({
    wishlistId,
    productId,
    addedBy: reqUser.userId,
  });

  return await item.save();
};

// Remove item (owner or collaborator with edit rights)
const remove = async (itemId, reqUser) => {
  const item = await WishlistItem.findById(itemId);
  if (!item) throw new Error('Wishlist item not found');

  const wishlist = await Wishlist.findById(item.wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  const authorized = await canEditWishlist(wishlist, reqUser);
  if (!authorized) {
    throw new Error('Not authorized to remove items from this wishlist');
  }

  return await item.deleteOne();
};

module.exports = {
  getByWishlist,
  add,
  remove,
};
