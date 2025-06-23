const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: String,
  name: String,
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  basePrice: Number,
  salePrice: Number,
  images: mongoose.Schema.Types.Mixed,
  videoUrl: String,
  isActive: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);