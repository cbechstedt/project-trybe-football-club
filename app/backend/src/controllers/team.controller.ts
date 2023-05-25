import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  static async findAll(req: Request, res: Response) {
    const teams = await TeamService.findAll();
    return res.status(200).json(teams);
  }
}

export default TeamController;
