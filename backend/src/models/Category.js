const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: String,
  isActive: { type: Boolean, default: true }
});

categorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await mongoose.model('Category').deleteMany({ parentId: this._id });
  next();
});

module.exports = mongoose.model('Category', categorySchema);