import { STORAGE_KEY } from "../constants.js"

export function saveMatch(state) {
  const data = {
    scoreA: state.scoreA,
    scoreB: state.scoreB,
    servingTeam: state.servingTeam,
    serverNumber: state.serverNumber,
    server: state.server,
    teamASwapped: state.teamASwapped,
    teamBSwapped: state.teamBSwapped,
    rallyCount: state.rallyCount,
    players: state.players,
    gameLog: state.gameLog,
    playerPoints: state.playerPoints,
    timeoutA: state.timeoutA,
    timeoutB: state.timeoutB,
    timeoutLimit: state.timeoutLimit,
    teamAName: state.teamAName,
    teamBName: state.teamBName,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadSavedMatch() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return null
  return JSON.parse(saved)
}

export function clearSavedMatch() {
  localStorage.removeItem(STORAGE_KEY)
}
