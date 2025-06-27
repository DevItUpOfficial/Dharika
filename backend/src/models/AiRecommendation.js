const mongoose = require('mongoose');

const aiRecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  context: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AiRecommendation', aiRecommendationSchema);