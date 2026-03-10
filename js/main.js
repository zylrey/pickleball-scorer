import { gameState, resetState, loadStateFrom, getCallScore } from "./state/game-state.js"
import { TEAM_A, TEAM_B, EVENT_GAME_START, INITIAL_SERVER_NUMBER } from "./constants.js"
import { cacheDomElements, dom } from "./dom/elements.js"
import { getRightSideServer } from "./game/serving.js"
import { isGameWon } from "./game/scoring.js"
import { createLogEntry, addLogEntry } from "./log/event-log.js"
import {
  renderScore, renderServerHighlight, renderPositions,
  renderPlayerNames, renderTeamLabels, renderRallyCount,
  renderTimeoutDots, renderLogTable, renderButtonLabels,
  showScreen, disableGameButtons,
} from "./dom/renderer.js"
import { hideWinModal, showResetModal, hideResetModal } from "./dom/modals.js"
import { saveMatch, loadSavedMatch, clearSavedMatch } from "./features/persistence.js"
import { readSetupForm, handleToggleTeamNames, handleTeamDropdownUpdate } from "./features/setup.js"
import { handleRallyWon } from "./game/rally.js"
import { handleTimeout } from "./game/timeout.js"
import { requestUndo, authorizeUndo } from "./features/undo.js"
import { downloadMatchReport } from "./features/pdf-export.js"

document.addEventListener("DOMContentLoaded", () => {
  cacheDomElements()
  registerEventListeners()
  loadMatch()
})

function registerEventListeners() {
  dom.startButton.addEventListener("click", startGame)
  dom.btnTeamA.addEventListener("click", () => handleRallyWon(TEAM_A))
  dom.btnTeamB.addEventListener("click", () => handleRallyWon(TEAM_B))
  dom.timeoutAButton.addEventListener("click", () => handleTimeout(TEAM_A))
  dom.timeoutBButton.addEventListener("click", () => handleTimeout(TEAM_B))
  dom.undoButton.addEventListener("click", requestUndo)
  dom.resetButton.addEventListener("click", showResetModal)
  dom.downloadButton.addEventListener("click", downloadMatchReport)

  dom.winDownloadButton.addEventListener("click", downloadMatchReport)
  dom.winCloseButton.addEventListener("click", hideWinModal)

  dom.resetCancelButton.addEventListener("click", hideResetModal)
  dom.resetConfirmButton.addEventListener("click", confirmReset)

  dom.undoCancelButton.addEventListener("click", () => {
    dom.undoModal.style.display = "none"
  })
  dom.undoConfirmButton.addEventListener("click", authorizeUndo)

  dom.teamANameInput.addEventListener("input", handleTeamDropdownUpdate)
  dom.teamBNameInput.addEventListener("input", handleTeamDropdownUpdate)
  dom.teamToggleBtn.addEventListener("click", handleToggleTeamNames)
}

function startGame() {
  const config = readSetupForm()

  gameState.players = config.players
  gameState.teamAName = config.teamAName
  gameState.teamBName = config.teamBName
  gameState.servingTeam = config.servingTeam
  gameState.gamePoint = config.gamePoint
  gameState.timeoutLimit = config.timeoutLimit

  showScreen(true)

  dom.startTeamA.innerText = gameState.teamAName
  dom.startTeamB.innerText = gameState.teamBName

  renderTeamLabels(gameState.teamAName, gameState.teamBName)
  renderButtonLabels(gameState.teamAName, gameState.teamBName)
  renderPlayerNames(gameState.players)

  resetGame()
  logGameStart()
}

function resetGame() {
  gameState.scoreA = 0
  gameState.scoreB = 0
  gameState.timeoutA = 0
  gameState.timeoutB = 0
  gameState.serverNumber = INITIAL_SERVER_NUMBER
  gameState.teamASwapped = false
  gameState.teamBSwapped = false
  gameState.playerPoints = { a1: 0, a2: 0, b1: 0, b2: 0 }
  gameState.server = getRightSideServer(gameState.servingTeam, gameState.teamASwapped, gameState.teamBSwapped)
  gameState.historyStack = []
  gameState.rallyCount = 0
  gameState.gameLog = []
  gameState.lastTimeoutTeam = null

  renderRallyCount(0)
  renderTimeoutDots(0, 0, gameState.timeoutLimit)
  renderLogTable([])
  updateGameUI()
  saveMatch(gameState)
}

function logGameStart() {
  renderRallyCount(gameState.rallyCount)
  gameState.rallyCount++
  const entry = createLogEntry(gameState.rallyCount, EVENT_GAME_START, getCallScore(), gameState.players[gameState.server])
  addLogEntry(gameState.gameLog, entry)
  renderLogTable(gameState.gameLog)
  saveMatch(gameState)
}

function loadMatch() {
  const saved = loadSavedMatch()
  if (!saved) return

  loadStateFrom(saved)

  showScreen(true)
  renderRallyCount(gameState.rallyCount)
  renderTeamLabels(gameState.teamAName, gameState.teamBName)
  renderPlayerNames(gameState.players)
  updateGameUI()
  renderTimeoutDots(gameState.timeoutA, gameState.timeoutB, gameState.timeoutLimit)
  renderLogTable(gameState.gameLog)

  if (isGameWon(gameState.scoreA, gameState.scoreB, gameState.gamePoint)) {
    disableGameButtons()
  }
}

function confirmReset() {
  clearSavedMatch()
  location.reload()
}

function updateGameUI() {
  renderScore(getCallScore())
  renderServerHighlight(gameState.server)
  renderPositions(gameState.teamASwapped, gameState.teamBSwapped)
}
