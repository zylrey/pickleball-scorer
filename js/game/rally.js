import { gameState, createSnapshot, getCallScore } from "../state/game-state.js"
import {
  TEAM_A, TEAM_B,
  EVENT_POINT, EVENT_SERVER_CHANGE, EVENT_SIDE_OUT, EVENT_WIN,
} from "../constants.js"
import { applyScore, getWinner, buildPlayerStats } from "./scoring.js"
import { getRightSideServer, getPartner } from "./serving.js"
import { createLogEntry, addLogEntry } from "../log/event-log.js"
import {
  renderScore, renderServerHighlight, renderPositions,
  renderRallyCount, renderLogTable, disableGameButtons,
} from "../dom/renderer.js"
import { showWinModal } from "../dom/modals.js"
import { saveMatch } from "../features/persistence.js"

export function handleRallyWon(team) {
  gameState.historyStack.push(createSnapshot())

  if (team === gameState.servingTeam) {
    applyScore(gameState, team)
    logRallyEvent(EVENT_POINT)
    checkAndHandleWin()
  } else {
    if (gameState.serverNumber === 1) {
      gameState.serverNumber = 2
      gameState.server = getPartner(gameState.server)
      logRallyEvent(EVENT_SERVER_CHANGE)
    } else {
      performSideOut()
      logRallyEvent(EVENT_SIDE_OUT)
    }
  }

  gameState.lastTimeoutTeam = null
  updateGameUI()
  saveMatch(gameState)
}

function performSideOut() {
  gameState.servingTeam = gameState.servingTeam === TEAM_A ? TEAM_B : TEAM_A
  gameState.serverNumber = 1
  gameState.server = getRightSideServer(gameState.servingTeam, gameState.teamASwapped, gameState.teamBSwapped)
}

function logRallyEvent(eventType) {
  renderRallyCount(gameState.rallyCount)
  gameState.rallyCount++
  const entry = createLogEntry(gameState.rallyCount, eventType, getCallScore(), gameState.players[gameState.server])
  addLogEntry(gameState.gameLog, entry)
  renderLogTable(gameState.gameLog)
  saveMatch(gameState)
}

function checkAndHandleWin() {
  const winner = getWinner(gameState.scoreA, gameState.scoreB, gameState.gamePoint)
  if (!winner) return

  const stats = buildPlayerStats(gameState.players, gameState.playerPoints, gameState.teamAName, gameState.teamBName)
  const mvp = stats[0]

  let statsHtml = "MVP: " + mvp.name + " - " + mvp.pts + " pts<br><br>"
  stats.slice(1).forEach(p => {
    statsHtml += p.name + " - " + p.pts + " pts<br>"
  })

  let winnerName = winner === TEAM_A ? gameState.teamAName : gameState.teamBName
  if (!winnerName || winnerName.trim() === "") {
    winnerName = winner === TEAM_A ? "Team A" : "Team B"
  }

  logRallyEvent(EVENT_WIN)
  showWinModal(winnerName, gameState.scoreA + " - " + gameState.scoreB, statsHtml)
  disableGameButtons()
}

function updateGameUI() {
  renderScore(getCallScore())
  renderServerHighlight(gameState.server)
  renderPositions(gameState.teamASwapped, gameState.teamBSwapped)
}
