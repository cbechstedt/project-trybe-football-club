import { ITeam } from '../interfaces/team';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  static async findAll(): Promise<ITeam[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }
}

export default TeamService;
