const GameScore = require('../../models/gameScore');
const Discount = require('../../models/discount');
const mongoose = require('mongoose');


// Helper: format date to "YYYY-MM"
const getMonthYear = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};



// Submit game score
async function submitScore(userId, score, levelReached, coinsEarned) {
  const now = new Date();
  const gameScore = await GameScore.create({
    userId,
    score,
    levelReached,
    coinsEarned,
    playDate: now,
    monthYear: getMonthYear(now)
  });
  return gameScore;
}



// Get leaderboard for a month
async function getLeaderboard(monthYear, limit) {
  return await GameScore.find({ monthYear })
    .sort({ score: -1 })
    .limit(limit);
}



// Get user stats: best score, total plays, rewards earned
async function getUserStats(userId) {
  const scores = await GameScore.find({ userId });
  const bestScore = scores.reduce((max, s) => Math.max(max, s.score), 0);
  const totalPlays = scores.length;

  // -------------------Pending--------------------
  const rewards = null;     // Have to implement reward and discount feature

  return { bestScore, totalPlays, rewards };
}


// Claim a reward based on user score
// -------------------Pending--------------------
async function claimReward(userId, score) {
  return null;
}




module.exports = {
  submitScore,
  getLeaderboard,
  getUserStats,
  claimReward
};
