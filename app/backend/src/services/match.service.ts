import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

class MatchService {
  static async findAll() {
    const matches = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }
}

export default MatchService;
