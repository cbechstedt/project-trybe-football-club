import { IMatchInfo, ITeamInfo2 } from '../interfaces/teamInfo';

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

export function calculateEfficiency(matches: IMatchInfo[]): number {
  const victories = countVictories(matches);
  const draws = countDraws(matches);
  const points = victories * 3 + draws;
  const totalGames = matches.length;
  const efficiency = (points / (totalGames * 3)) * 100;
  return Number(efficiency.toFixed(2));
}

function calculatePoints(matches: IMatchInfo[]) {
  const victories = countVictories(matches);
  const draws = countDraws(matches);
  const points = victories * 3 + draws;
  return points;
}

function calculateGoalsBalance(matches: IMatchInfo[]) {
  const goalsFavor = calculateGoalsFavor(matches);
  const goalsOwn = calculateGoalsOwn(matches);
  const goalsBalance = goalsFavor - goalsOwn;
  return goalsBalance;
}

export function createTeamInfo(matches: IMatchInfo[], teamName: string): ITeamInfo2 {
  const teamInfo = {
    name: teamName,
    totalPoints: calculatePoints(matches),
    totalGames: matches.length,
    totalVictories: countVictories(matches),
    totalDraws: countDraws(matches),
    totalLosses: countLosses(matches),
    goalsFavor: calculateGoalsFavor(matches),
    goalsOwn: calculateGoalsOwn(matches),
    goalsBalance: calculateGoalsBalance(matches),
    efficiency: calculateEfficiency(matches),
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
