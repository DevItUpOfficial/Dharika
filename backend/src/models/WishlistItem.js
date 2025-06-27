const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  wishlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);