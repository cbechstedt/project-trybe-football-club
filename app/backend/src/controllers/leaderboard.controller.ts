import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  static async generateInfoHomeTeams(req: Request, res: Response) {
    const infoHomeTeams = await LeaderboardService.generateInfoHomeTeams();
    return res.status(200).json(infoHomeTeams);
  }
}

export default LeaderboardController;
