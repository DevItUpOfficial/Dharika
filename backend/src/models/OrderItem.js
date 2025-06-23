const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' },
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('OrderItem', orderItemSchema);