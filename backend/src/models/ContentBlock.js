const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema({
  type: String,
  title: String,
  content: String,
  metadata: mongoose.Schema.Types.Mixed,
  isActive: Boolean
}, { timestamps: true });

module.exports = mongoose.model('ContentBlock', contentBlockSchema);