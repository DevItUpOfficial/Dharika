const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: String,
  type: String,
  value: Number,
  validFrom: Date,
  validTo: Date,
  usageLimit: Number,
  usageCount: Number,
  affiliateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' }
});

module.exports = mongoose.model('Discount', discountSchema);