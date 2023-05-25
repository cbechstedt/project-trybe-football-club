import { ITeam } from '../interfaces/team';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  static async findAll(): Promise<ITeam[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async findById(id: number): Promise<ITeam | null> {
    const team = await TeamModel.findOne({
      where: { id },
    });
    return team;
  }
}

export default TeamService;
