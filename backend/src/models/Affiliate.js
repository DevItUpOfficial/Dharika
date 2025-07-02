const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
  name: String,
  code: String,
  commission: Number
}, { timestamps: true });

module.exports = mongoose.model('Affiliate', affiliateSchema);