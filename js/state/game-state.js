import {
  TEAM_A,
  PLAYER_A1, PLAYER_A2, PLAYER_B1, PLAYER_B2,
  DEFAULT_GAME_POINT, DEFAULT_TIMEOUT_LIMIT, INITIAL_SERVER_NUMBER,
  DEFAULT_TEAM_A_NAME, DEFAULT_TEAM_B_NAME, DEFAULT_PLAYER_NAMES,
} from "../constants.js"

function createInitialState() {
  return {
    scoreA: 0,
    scoreB: 0,
    servingTeam: TEAM_A,
    serverNumber: INITIAL_SERVER_NUMBER,
    server: PLAYER_A2,
    teamASwapped: false,
    teamBSwapped: false,
    teamAName: DEFAULT_TEAM_A_NAME,
    teamBName: DEFAULT_TEAM_B_NAME,
    players: { ...DEFAULT_PLAYER_NAMES },
    playerPoints: { [PLAYER_A1]: 0, [PLAYER_A2]: 0, [PLAYER_B1]: 0, [PLAYER_B2]: 0 },
    gameLog: [],
    historyStack: [],
    rallyCount: 0,
    timeoutA: 0,
    timeoutB: 0,
    timeoutLimit: DEFAULT_TIMEOUT_LIMIT,
    gamePoint: DEFAULT_GAME_POINT,
    lastTimeoutTeam: null,
  }
}

export const gameState = createInitialState()

export function resetState() {
  const fresh = createInitialState()
  Object.assign(gameState, fresh)
}

export function loadStateFrom(saved) {
  gameState.scoreA = saved.scoreA
  gameState.scoreB = saved.scoreB
  gameState.servingTeam = saved.servingTeam
  gameState.serverNumber = saved.serverNumber
  gameState.server = saved.server
  gameState.teamASwapped = saved.teamASwapped
  gameState.teamBSwapped = saved.teamBSwapped
  gameState.rallyCount = saved.rallyCount
  gameState.players = saved.players
  gameState.playerPoints = saved.playerPoints || { [PLAYER_A1]: 0, [PLAYER_A2]: 0, [PLAYER_B1]: 0, [PLAYER_B2]: 0 }
  gameState.timeoutA = saved.timeoutA || 0
  gameState.timeoutB = saved.timeoutB || 0
  gameState.timeoutLimit = saved.timeoutLimit || DEFAULT_TIMEOUT_LIMIT
  gameState.teamAName = saved.teamAName || DEFAULT_TEAM_A_NAME
  gameState.teamBName = saved.teamBName || DEFAULT_TEAM_B_NAME
  gameState.gameLog = saved.gameLog || []
  gameState.historyStack = []
  gameState.lastTimeoutTeam = null
}

export function createSnapshot() {
  return {
    scoreA: gameState.scoreA,
    scoreB: gameState.scoreB,
    servingTeam: gameState.servingTeam,
    serverNumber: gameState.serverNumber,
    server: gameState.server,
    teamASwapped: gameState.teamASwapped,
    teamBSwapped: gameState.teamBSwapped,
    playerPoints: { ...gameState.playerPoints },
    timeoutA: gameState.timeoutA,
    timeoutB: gameState.timeoutB,
  }
}

export function restoreSnapshot(snapshot) {
  gameState.scoreA = snapshot.scoreA
  gameState.scoreB = snapshot.scoreB
  gameState.servingTeam = snapshot.servingTeam
  gameState.serverNumber = snapshot.serverNumber
  gameState.server = snapshot.server
  gameState.teamASwapped = snapshot.teamASwapped
  gameState.teamBSwapped = snapshot.teamBSwapped
  gameState.playerPoints = { ...snapshot.playerPoints }
  gameState.timeoutA = snapshot.timeoutA
  gameState.timeoutB = snapshot.timeoutB
}

export function getCallScore() {
  if (gameState.servingTeam === TEAM_A) {
    return gameState.scoreA + "-" + gameState.scoreB + "-" + gameState.serverNumber
  }
  return gameState.scoreB + "-" + gameState.scoreA + "-" + gameState.serverNumber
}
