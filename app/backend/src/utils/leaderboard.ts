import { IMatchInfo, ITeamInfo2 } from '../interfaces/teamInfo';

export function getHomeMatchesByTeam(teamName: string, matches: IMatchInfo[]) {
  return matches.filter((match) => match.homeTeam.teamName === teamName);
}

export function getAwayMatchesByTeam(teamName: string, matches: IMatchInfo[]) {
  return matches.filter((match) => match.awayTeam.teamName === teamName);
}

export function countHomeVictories(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

export function countAwayVictories(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
}

export function countHomeDraws(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

export function countAwayDraws(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
}

export function countHomeLosses(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
}

export function countAwayLosses(matches: IMatchInfo[]): number {
  return matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
}

export function calculateHomeGoalsFavor(matches: IMatchInfo[]): number {
  return matches.reduce((sum, match) => sum + match.homeTeamGoals, 0);
}

export function calculateAwayGoalsFavor(matches: IMatchInfo[]): number {
  return matches.reduce((sum, match) => sum + match.awayTeamGoals, 0);
}

export function calculateHomeGoalsOwn(matches: IMatchInfo[]): number {
  return matches.reduce((sum, match) => sum + match.awayTeamGoals, 0);
}

export function calculateAwayGoalsOwn(matches: IMatchInfo[]): number {
  return matches.reduce((sum, match) => sum + match.homeTeamGoals, 0);
}

export function calculateHomeEfficiency(matches: IMatchInfo[]): number {
  const victories = countHomeVictories(matches);
  const draws = countHomeDraws(matches);
  const points = victories * 3 + draws;
  const totalGames = matches.length;
  const efficiency = (points / (totalGames * 3)) * 100;
  return Number(efficiency.toFixed(2));
}

export function calculateAwayEfficiency(matches: IMatchInfo[]): number {
  const victories = countAwayVictories(matches);
  const draws = countAwayDraws(matches);
  const points = victories * 3 + draws;
  const totalGames = matches.length;
  const efficiency = (points / (totalGames * 3)) * 100;
  return Number(efficiency.toFixed(2));
}

function calculateHomePoints(matches: IMatchInfo[]) {
  const victories = countHomeVictories(matches);
  const draws = countHomeDraws(matches);
  const points = victories * 3 + draws;
  return points;
}

function calculateAwayPoints(matches: IMatchInfo[]) {
  const victories = countAwayVictories(matches);
  const draws = countAwayDraws(matches);
  const points = victories * 3 + draws;
  return points;
}

function calculateHomeGoalsBalance(matches: IMatchInfo[]) {
  const goalsFavor = calculateHomeGoalsFavor(matches);
  const goalsOwn = calculateHomeGoalsOwn(matches);
  const goalsBalance = goalsFavor - goalsOwn;
  return goalsBalance;
}

function calculateAwayGoalsBalance(matches: IMatchInfo[]) {
  const goalsFavor = calculateAwayGoalsFavor(matches);
  const goalsOwn = calculateAwayGoalsOwn(matches);
  const goalsBalance = goalsFavor - goalsOwn;
  return goalsBalance;
}

export function createHomeTeamInfo(matches: IMatchInfo[], teamName: string): ITeamInfo2 {
  const teamInfo = {
    name: teamName,
    totalPoints: calculateHomePoints(matches),
    totalGames: matches.length,
    totalVictories: countHomeVictories(matches),
    totalDraws: countHomeDraws(matches),
    totalLosses: countHomeLosses(matches),
    goalsFavor: calculateHomeGoalsFavor(matches),
    goalsOwn: calculateHomeGoalsOwn(matches),
    goalsBalance: calculateHomeGoalsBalance(matches),
    efficiency: calculateHomeEfficiency(matches),
  };
  return teamInfo;
}

export function createAwayTeamInfo(matches: IMatchInfo[], teamName: string): ITeamInfo2 {
  const teamInfo = {
    name: teamName,
    totalPoints: calculateAwayPoints(matches),
    totalGames: matches.length,
    totalVictories: countAwayVictories(matches),
    totalDraws: countAwayDraws(matches),
    totalLosses: countAwayLosses(matches),
    goalsFavor: calculateAwayGoalsFavor(matches),
    goalsOwn: calculateAwayGoalsOwn(matches),
    goalsBalance: calculateAwayGoalsBalance(matches),
    efficiency: calculateAwayEfficiency(matches),
  };
  return teamInfo;
}

function compareTeamsByCriterion<K extends keyof ITeamInfo2>(
  teamA: ITeamInfo2,
  teamB: ITeamInfo2,
  criterion: K,
): number {
  if (teamA[criterion] > teamB[criterion]) {
    return -1;
  } if (teamA[criterion] < teamB[criterion]) {
    return 1;
  }
  return 0;
}

function compareTeamsByCriteria(teamA: ITeamInfo2, teamB: ITeamInfo2): number {
  const criteriaOrder: (keyof ITeamInfo2)[] = ['totalVictories', 'goalsBalance', 'goalsFavor'];

  let comparisonResult = 0;
  criteriaOrder.forEach((criterion) => {
    if (comparisonResult === 0 && teamA[criterion] !== teamB[criterion]) {
      comparisonResult = compareTeamsByCriterion(teamA, teamB, criterion);
    }
  });

  return comparisonResult;
}

export function compareTeams(teamA: ITeamInfo2, teamB: ITeamInfo2): number {
  if (teamA.totalPoints > teamB.totalPoints) {
    return -1;
  } if (teamA.totalPoints < teamB.totalPoints) {
    return 1;
  }
  return compareTeamsByCriteria(teamA, teamB);
}

export function mergeTeams(homeTeam: ITeamInfo2, awayTeam: ITeamInfo2): ITeamInfo2 {
  const mergedTeam: ITeamInfo2 = {
    name: homeTeam.name,
    totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
    totalGames: homeTeam.totalGames + awayTeam.totalGames,
    totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
    totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
    totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
    goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
    goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
    goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
    efficiency: Number((((homeTeam.totalPoints + awayTeam.totalPoints)
    / ((homeTeam.totalGames + awayTeam.totalGames) * 3)) * 100).toFixed(2)),
  };

  return mergedTeam;
}
