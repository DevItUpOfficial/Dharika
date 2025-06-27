const mongoose = require('mongoose');
const Cart = require('./Cart');
const Wishlist = require('./Wishlist');
const GameScore = require('./GameScore');
const Order = require('./Order');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  firstName: String,
  lastName: String,
  isVerified: { type: Boolean, default: false },
  gameScore: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await Cart.deleteMany({ userId: this._id });
  await Wishlist.deleteMany({ userId: this._id });
  await GameScore.deleteMany({ userId: this._id });
  await Order.deleteMany({ userId: this._id });
  next();
});

module.exports = mongoose.model('User', userSchema);