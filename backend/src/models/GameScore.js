const mongoose = require('mongoose');

const gameScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  levelReached: Number,
  coinsEarned: Number,
  playDate: Date,
  monthYear: String
});

module.exports = mongoose.model('GameScore', gameScoreSchema);