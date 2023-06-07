import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  static async generateInfoHomeTeams(req: Request, res: Response) {
    const infoHomeTeams = await LeaderboardService.generateInfoHomeTeams();
    return res.status(200).json(infoHomeTeams);
  }

  static async generateInfoAwayTeams(req: Request, res: Response) {
    const infoAwayTeams = await LeaderboardService.generateInfoAwayTeams();
    return res.status(200).json(infoAwayTeams);
  }
}

export default LeaderboardController;
