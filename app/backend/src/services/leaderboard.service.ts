import { ITeamInfo2 } from '../interfaces/teamInfo';
import MatchService from './match.service';
import TeamService from './team.service';
import { getHomeMatchesByTeam,
  createHomeTeamInfo,
  compareTeams,
  createAwayTeamInfo,
  getAwayMatchesByTeam,
  mergeTeams,
} from '../utils/leaderboard';

class LeaderboardService {
  static async generateCompleteLeaderboard(): Promise<ITeamInfo2[]> {
    const homeTeams = await this.generateInfoHomeTeams();
    const awayTeams = await this.generateInfoAwayTeams();

    const mergedTeams: ITeamInfo2[] = [];

    homeTeams.forEach((homeTeam) => {
      const awayTeamIndex = awayTeams.findIndex((awayTeam) => awayTeam.name === homeTeam.name);

      if (awayTeamIndex !== -1) {
        const awayTeam = awayTeams.splice(awayTeamIndex, 1)[0];
        const mergedTeam = mergeTeams(homeTeam, awayTeam);
        mergedTeams.push(mergedTeam);
      } else {
        mergedTeams.push(homeTeam);
      }
    });

    mergedTeams.push(...awayTeams);

    return this.sortTeams(mergedTeams);
  }

  static async generateInfoHomeTeams(): Promise<ITeamInfo2[]> {
    const matches = await MatchService.findFinishedMatches();
    const teams = await TeamService.findAll();

    const infoHomeTeams = teams.map((team) => {
      const homeMatches = getHomeMatchesByTeam(team.teamName, matches);
      const teamInfo = createHomeTeamInfo(homeMatches, team.teamName);

      return teamInfo;
    });

    return this.sortTeams(infoHomeTeams);
  }

  static async generateInfoAwayTeams(): Promise<ITeamInfo2[]> {
    const matches = await MatchService.findFinishedMatches();
    const teams = await TeamService.findAll();

    const infoAwayTeams = teams.map((team) => {
      const awayMatches = getAwayMatchesByTeam(team.teamName, matches);
      const teamInfo = createAwayTeamInfo(awayMatches, team.teamName);

      return teamInfo;
    });

    return this.sortTeams(infoAwayTeams);
  }

  static sortTeams(infoTeams: ITeamInfo2[]): ITeamInfo2[] {
    infoTeams.sort(compareTeams);

    return infoTeams;
  }
}

export default LeaderboardService;
