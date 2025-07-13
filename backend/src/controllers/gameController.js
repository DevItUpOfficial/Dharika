const gameService = require('../services/game/gameService');


// Submit Score
const submitScore = async (req, res) => {
  try {
    const userId = req.userId;
    const { score, levelReached, coinsEarned } = req.body;
    const result = await gameService.submitScore(userId, score, levelReached, coinsEarned);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Get Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const { monthYear, limit } = req.query;
    const leaderboard = await gameService.getLeaderboard(monthYear, parseInt(limit || 10));
    res.json(leaderboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Get User Stats
const getUserStats = async (req, res) => {
  try {
    const userId = req.userId;
    const stats = await gameService.getUserStats(userId);
    res.json(stats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Claim Reward
// -------------------Pending--------------------
const claimReward = async (req, res) => {
  try {
    const userId = req.userId;
    const { score } = req.body;
    const result = await gameService.claimReward(userId, score);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  submitScore,
  getLeaderboard,
  getUserStats,
  claimReward
};
