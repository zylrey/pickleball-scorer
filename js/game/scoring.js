import { TEAM_A, WIN_MARGIN } from "../constants.js"

export function applyScore(state, team) {
  if (team === TEAM_A) {
    state.scoreA++
    state.teamASwapped = !state.teamASwapped
  } else {
    state.scoreB++
    state.teamBSwapped = !state.teamBSwapped
  }
  state.playerPoints[state.server]++
}

export function isGameWon(scoreA, scoreB, gamePoint) {
  return getWinner(scoreA, scoreB, gamePoint) !== null
}

export function getWinner(scoreA, scoreB, gamePoint) {
  if (scoreA >= gamePoint && scoreA - scoreB >= WIN_MARGIN) {
    return TEAM_A
  }
  if (scoreB >= gamePoint && scoreB - scoreA >= WIN_MARGIN) {
    return "B"
  }
  return null
}

export function buildPlayerStats(players, playerPoints, teamAName, teamBName) {
  const stats = [
    { name: players.a1 + " - " + teamAName, pts: playerPoints.a1 },
    { name: players.a2 + " - " + teamAName, pts: playerPoints.a2 },
    { name: players.b1 + " - " + teamBName, pts: playerPoints.b1 },
    { name: players.b2 + " - " + teamBName, pts: playerPoints.b2 },
  ]
  stats.sort((a, b) => b.pts - a.pts)
  return stats
}
