const Wishlist = require('../../models/Wishlist');
const WishlistItem = require('../../models/WishlistItem');
const WishlistCollaborator = require('../../models/WishlistCollaborator');
const Product = require('../../models/Product');
const User = require('../../models/User');

const crypto = require('crypto');


//Get all wishlists for a user
const getByUser = async (userId) => {
  return await Wishlist.find({ userId });
};

//Create a new wishlist
const create = async (userData) => {
  const { userId, name, isCollaborative = false, isPublic = false } = userData;

  // Check if user exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    throw new Error('User not found');
  }

  const wishlist = new Wishlist({
    userId,
    name,
    isCollaborative,
    isPublic,
  });

  return await wishlist.save();
};

//Update an existing wishlist
const update = async (wishlistId, updates) => {
  return await Wishlist.findByIdAndUpdate(wishlistId, updates, { new: true });
};

//Delete a wishlist and cascade delete items + collaborators (handled by pre hook)
const remove = async (wishlistId) => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) {
    throw new Error('Wishlist not found');
  }
  await wishlist.deleteOne(); // triggers pre hook to delete associated items and collaborators
};

//Generate a share token for collaborative access
const share = async (wishlistId) => {
  let updated;
  let attempts = 0;
  const maxRetries = 3;

  // looping 3 times to ensure uniqueness of generated token
  while (!updated && attempts < maxRetries) {
    const token = crypto.randomUUID(); //have maximum chances of uniqueness

    try {
      updated = await Wishlist.findByIdAndUpdate(
        wishlistId,
        { shareToken: token },
        { new: true }
      );
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error, retry
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


//Get a shared wishlist by token
const getShared = async (token) => {
  const wishlist = await Wishlist.findOne({ shareToken: token });
  if (!wishlist) {
    throw new Error('Invalid or expired share token');
  }

  // Get all wishlist items with product details and who added it
  const items = await WishlistItem.find({ wishlistId: wishlist._id })
    .populate('productId')
    .populate('addedBy', 'firstName lastName email');

  // Get all collaborators with user info and permissions
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
  getByUser,
  create,
  update,
  remove,
  share,
  getShared,
};
