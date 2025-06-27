const WishlistItem = require('../../models/WishlistItem');

//Get all items for a specific wishlist
const getByWishlist = async (wishlistId) => {
  return await WishlistItem.find({ wishlistId }).populate('productId addedBy');
};

//Add an item to a wishlist
const add = async (wishlistId, productId, userId) => {
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

//Remove an item from the wishlist
const remove = async (itemId) => {
  const item = await WishlistItem.findById(itemId);
  if (!item) {
    throw new Error('Wishlist item not found');
  }
  return await item.deleteOne();
};

module.exports = {
  getByWishlist,
  add,
  remove,
};
