import express = require('express');
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/', LeaderboardController.generateCompleteLeaderboard);
leaderboardRouter.get('/home', LeaderboardController.generateInfoHomeTeams);
leaderboardRouter.get('/away', LeaderboardController.generateInfoAwayTeams);

export default leaderboardRouter;
