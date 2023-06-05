import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  static async findAll(req: Request, res: Response) {
    const matches = await MatchService.findAll();
    return res.status(200).json(matches);
  }
}

export default MatchController;
