import { IMatchInfo, ITeamInfo2 } from '../interfaces/teamInfo';
import MatchService from './match.service';
import TeamService from './team.service';
import {
  getHomeMatchesByTeam,
  countVictories,
  countDraws,
  countLosses,
  calculateGoalsFavor,
  calculateGoalsOwn,
} from '../utils/leaderboard';

class LeaderboardService {
  static async generateInfoHomeTeams(): Promise<ITeamInfo2[]> {
    const matches = await MatchService.findFinishedMatches();
    const teams = await TeamService.findAll();

    const infoHomeTeams = teams.map((team) => {
      const homeMatches = getHomeMatchesByTeam(team.teamName, matches);
      const teamInfo = this.createTeamInfo(homeMatches, team.teamName);
      // console.log('homeMatches', homeMatches);
      // console.log('teamInfo', teamInfo);
      return teamInfo;
    });
    return infoHomeTeams;
  }

  static createTeamInfo(matches: IMatchInfo[], teamName: string): ITeamInfo2 {
    const totalGames = matches.length;
    const totalVictories = countVictories(matches);
    const totalDraws = countDraws(matches);
    const totalLosses = countLosses(matches);
    const goalsFavor = calculateGoalsFavor(matches);
    const goalsOwn = calculateGoalsOwn(matches);
    const totalPoints = totalVictories * 3 + totalDraws;

    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
    };
  }
}

export default LeaderboardService;
