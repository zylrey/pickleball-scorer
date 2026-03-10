import { gameState, restoreSnapshot, getCallScore } from "../state/game-state.js"
import { ADMIN_CODE } from "../constants.js"
import { removeLastLogEntry } from "../log/event-log.js"
import {
  renderScore, renderServerHighlight, renderPositions,
  renderTimeoutDots, renderLogTable, renderRallyCount, enableGameButtons,
} from "../dom/renderer.js"
import { showUndoModal, hideUndoModal, getUndoPasswordValue } from "../dom/modals.js"
import { saveMatch } from "../features/persistence.js"

export function requestUndo() {
  showUndoModal()
}

export function authorizeUndo() {
  const code = getUndoPasswordValue()
  if (code !== ADMIN_CODE) {
    alert("Invalid admin code")
    return
  }
  hideUndoModal()
  performUndo()
}

function performUndo() {
  if (gameState.historyStack.length === 0) return

  const snapshot = gameState.historyStack.pop()
  restoreSnapshot(snapshot)
  removeLastLogEntry(gameState.gameLog)

  renderTimeoutDots(gameState.timeoutA, gameState.timeoutB, gameState.timeoutLimit)
  renderLogTable(gameState.gameLog)
  renderScore(getCallScore())
  renderServerHighlight(gameState.server)
  renderPositions(gameState.teamASwapped, gameState.teamBSwapped)
  renderRallyCount(gameState.rallyCount > 0 ? gameState.rallyCount - 1 : 0)
  enableGameButtons()
  saveMatch(gameState)
}
