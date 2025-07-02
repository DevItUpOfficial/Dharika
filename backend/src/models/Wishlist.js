<<<<<<< HEAD
const mongoose = require('mongoose');
const WishlistItem = require('./WishlistItem');
const WishlistCollaborator = require('./WishlistCollaborator');

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  isCollaborative: Boolean,
  isPublic: Boolean,
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, { timestamps: true });

wishlistSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await WishlistItem.deleteMany({ wishlistId: this._id });
  await WishlistCollaborator.deleteMany({ wishlistId: this._id });
  next();
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
=======
const mongoose = require("mongoose");
const WishlistItem = require("./WishlistItem");
const WishlistCollaborator = require("./WishlistCollaborator");

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    isCollaborative: Boolean,
    isPublic: Boolean,
    shareToken: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

wishlistSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await WishlistItem.deleteMany({ wishlistId: this._id });
    await WishlistCollaborator.deleteMany({ wishlistId: this._id });
    next();
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
>>>>>>> feature/auth
