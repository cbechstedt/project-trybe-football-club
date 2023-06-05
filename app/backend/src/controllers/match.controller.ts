import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  static async findAll(req: Request, res: Response) {
    console.log(req.query);
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const inProgressMatches = await MatchService.findInProgressMatches();
      return res.status(200).json(inProgressMatches);
    }

    if (inProgress === 'false') {
      const finishedMatches = await MatchService.findFinishedMatches();
      return res.status(200).json(finishedMatches);
    }

    const matches = await MatchService.findAll();
    return res.status(200).json(matches);
  }
}

export default MatchController;
