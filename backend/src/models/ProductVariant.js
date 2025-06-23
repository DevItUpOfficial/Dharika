const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  size: String,
  color: String,
  stockQuantity: Number,
  additionalPrice: Number,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('ProductVariant', productVariantSchema);