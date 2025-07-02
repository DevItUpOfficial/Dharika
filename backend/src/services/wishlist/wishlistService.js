const Wishlist = require('../../models/Wishlist');
const WishlistItem = require('../../models/WishlistItem');
const WishlistCollaborator = require('../../models/WishlistCollaborator');
const Product = require('../../models/Product');
const User = require('../../models/User');

const crypto = require('crypto');

// Helper: check if user is owner or admin
const isOwnerOrAdmin = (ownerId, reqUser) => {
  return String(ownerId) === String(reqUser.userId) || reqUser.role === 'admin';
};

// Get all wishlists for a user (only their own wishlists or admin)
const getByUser = async (requestingUser, targetUserId) => {
  if (!isOwnerOrAdmin(targetUserId, requestingUser)) {
    throw new Error('Not authorized to access this user’s wishlists');
  }
  return await Wishlist.find({ userId: targetUserId });
};

// Create a new wishlist (any logged-in user can)
const create = async ({ userId, name, isCollaborative = false, isPublic = false }) => {
  const userExists = await User.findById(userId);
  if (!userExists) throw new Error('User not found');

  const wishlist = new Wishlist({ userId, name, isCollaborative, isPublic });
  return await wishlist.save();
};

// Update an existing wishlist (only owner or admin)
const update = async (wishlistId, updates, reqUser) => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  if (!isOwnerOrAdmin(wishlist.userId, reqUser)) {
    throw new Error('Not authorized to update this wishlist');
  }

  Object.assign(wishlist, updates);
  return await wishlist.save();
};

// Delete a wishlist (only owner or admin)
const remove = async (wishlistId, reqUser) => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  if (!isOwnerOrAdmin(wishlist.userId, reqUser)) {
    throw new Error('Not authorized to delete this wishlist');
  }

  await wishlist.deleteOne(); // triggers pre hook to delete items and collaborators
};

// Generate a share token (only owner or admin)
const share = async (wishlistId, reqUser) => {
  let updated;
  let attempts = 0;
  const maxRetries = 3;

  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) throw new Error('Wishlist not found');

  if (!isOwnerOrAdmin(wishlist.userId, reqUser)) {
    throw new Error('Not authorized to share this wishlist');
  }

  while (!updated && attempts < maxRetries) {
    const token = crypto.randomUUID();

    try {
      updated = await Wishlist.findByIdAndUpdate(
        wishlistId,
        { shareToken: token },
        { new: true }
      );
    } catch (err) {
      if (err.code === 11000) {
        attempts++;
      } else {
        throw err;
      }
    }
  }

  if (!updated) {
    throw new Error('Failed to generate unique share token after multiple attempts');
  }

  return {
    token: updated.shareToken,
    url: `${process.env.CLIENT_URL || 'https://dharika.co.in'}/wishlist/shared/${updated.shareToken}`,
  };
};

// Get a shared wishlist by token
const getShared = async (token, userId = null) => {
  const wishlist = await Wishlist.findOne({ shareToken: token });
  if (!wishlist) throw new Error('Invalid or expired share token');

  // Check access if it's not public
  if (!wishlist.isPublic) {
    const isOwner = userId && String(wishlist.userId) === String(userId);
    const isCollaborator = userId &&
      (await WishlistCollaborator.exists({ wishlistId: wishlist._id, userId }));

    if (!isOwner && !isCollaborator) {
      throw new Error('Access denied to private shared wishlist');
    }
  }

  const items = await WishlistItem.find({ wishlistId: wishlist._id })
    .populate('productId')
    .populate('addedBy', 'firstName lastName email');

  const collaborators = await WishlistCollaborator.find({ wishlistId: wishlist._id })
    .populate('userId', 'firstName lastName email')
    .select('userId canEdit');

  return {
    wishlist,
    items,
    collaborators,
  };
};

module.exports = {
  getByUser,   // Owner or admin
  create,      // Any logged-in user
  update,      // Owner or admin
  remove,      // Owner or admin
  share,       // Owner or admin
  getShared    // Public = anyone, Private = only owner/collaborators
};
