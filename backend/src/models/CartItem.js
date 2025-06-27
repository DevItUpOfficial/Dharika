const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' },
  quantity: Number,
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', cartItemSchema);