import express = require('express');
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', LeaderboardController.generateInfoHomeTeams);

export default leaderboardRouter;
