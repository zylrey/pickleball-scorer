import { gameState, createSnapshot, getCallScore } from "../state/game-state.js"
import { TEAM_A, EVENT_TIMEOUT_A, EVENT_TIMEOUT_B } from "../constants.js"
import { createLogEntry, addLogEntry } from "../log/event-log.js"
import { renderTimeoutDots, renderLogTable, renderRallyCount } from "../dom/renderer.js"
import { saveMatch } from "../features/persistence.js"
import { isGameWon } from "./scoring.js"

export function handleTimeout(team) {
  if (isGameWon(gameState.scoreA, gameState.scoreB, gameState.gamePoint)) return

  if (gameState.lastTimeoutTeam === team) {
    if (!confirm("Same team calling timeout again. Continue?")) return
  }

  if (team === TEAM_A) {
    if (gameState.timeoutA >= gameState.timeoutLimit) return
    gameState.historyStack.push(createSnapshot())
    gameState.timeoutA++
    logTimeout(EVENT_TIMEOUT_A)
  } else {
    if (gameState.timeoutB >= gameState.timeoutLimit) return
    gameState.historyStack.push(createSnapshot())
    gameState.timeoutB++
    logTimeout(EVENT_TIMEOUT_B)
  }

  gameState.lastTimeoutTeam = team
  renderTimeoutDots(gameState.timeoutA, gameState.timeoutB, gameState.timeoutLimit)
  saveMatch(gameState)
}

function logTimeout(eventType) {
  renderRallyCount(gameState.rallyCount)
  gameState.rallyCount++
  const entry = createLogEntry(gameState.rallyCount, eventType, getCallScore(), gameState.players[gameState.server])
  addLogEntry(gameState.gameLog, entry)
  renderLogTable(gameState.gameLog)
  saveMatch(gameState)
}
