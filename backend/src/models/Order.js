const mongoose = require('mongoose');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderNumber: String,
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  shippingAddress: mongoose.Schema.Types.Mixed
}, { timestamps: true });

orderSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await OrderItem.deleteMany({ orderId: this._id });
  await Payment.deleteMany({ orderId: this._id });
  next();
});

module.exports = mongoose.model('Order', orderSchema);