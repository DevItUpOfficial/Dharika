const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const requireAuth = require('../middleware/auth');

// Submit game score
router.post('/score', requireAuth, gameController.submitScore);

// Get leaderboard for a month
router.get('/leaderboard', gameController.getLeaderboard);

// Get user stats (best score, total plays, rewards)
router.get('/stats', requireAuth, gameController.getUserStats);



// Claim reward based on score
// --------------------------------Pending---------------------------------
router.post('/claim-reward', requireAuth, gameController.claimReward);

module.exports = router;
