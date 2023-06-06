import { IMatchInfo } from '../interfaces/teamInfo';

export function getHomeMatchesByTeam(teamName: string, matches: IMatchInfo[]) {
  return matches.filter((match) => match.homeTeam.teamName === teamName);
}

export function countVictories(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

export function countDraws(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

export function countLosses(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
}

export function calculateGoalsFavor(matches: IMatchInfo[]): number {
  return matches.reduce((sum, match) => sum + match.homeTeamGoals, 0);
}

export function calculateGoalsOwn(matches: IMatchInfo[]): number {
  return matches.reduce((sum, match) => sum + match.awayTeamGoals, 0);
}
