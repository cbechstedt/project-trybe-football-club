import { IMatchInfo } from '../interfaces/teamInfo';
import { ICreatedMatch } from '../interfaces/createdMatch';
import { IUpdatedMatch } from '../interfaces/updatedMatch';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

class MatchService {
  static async findAll(): Promise<IMatchInfo[]> {
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
    return matches as unknown as IMatchInfo[];
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

  static async finishMatch(id: number) {
    const [updatedCount] = await MatchModel.update({ inProgress: false }, { where: { id } });

    if (updatedCount === 0) {
      const match = await MatchModel.findByPk(id);
      if (!match) {
        return { message: 'Match not found' };
      }
      return { message: 'Cannot finish an already finished match' };
    }

    return { message: 'Finished' };
  }

  static async updateMatch(id: number, updatedData: IUpdatedMatch) {
    const match = await MatchModel.findByPk(id);

    if (!match) {
      return { message: 'Match not found' };
    }

    if (!match.inProgress) {
      return { message: 'Cannot update an already finished match' };
    }

    const { homeTeamGoals, awayTeamGoals } = updatedData;

    const updatedMatch = await match.update({ homeTeamGoals, awayTeamGoals });

    return updatedMatch;
  }

  static async createMatch(createdData: ICreatedMatch) {
    const { homeTeamId, awayTeamId } = createdData;

    const homeTeam = await TeamModel.findByPk(homeTeamId);
    const awayTeam = await TeamModel.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { type: 'error', message: 'There is no team with such id!' };
    }

    const newMatch = await MatchModel.create({ ...createdData, inProgress: true });

    return { type: null, message: newMatch };
  }
}

export default MatchService;
