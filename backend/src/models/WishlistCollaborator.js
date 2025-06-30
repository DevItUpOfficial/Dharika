const mongoose = require('mongoose');

const wishlistCollaboratorSchema = new mongoose.Schema({
  wishlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  canEdit: Boolean,
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WishlistCollaborator', wishlistCollaboratorSchema);