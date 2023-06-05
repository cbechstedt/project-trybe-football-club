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

  static async findInProgressMatches() {
    const matches = await this.findAll();
    const inProgressMatches = matches.filter((match) => match.inProgress === true);
    return inProgressMatches;
  }

  static async findFinishedMatches() {
    const matches = await this.findAll();
    const finishedMatches = matches.filter((match) => match.inProgress === false);
    return finishedMatches;
  }
}

export default MatchService;
