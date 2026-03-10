import { gameState } from "../state/game-state.js"
import {
  PDF_HEADER_COLOR, PDF_LOG_HEADER_COLOR,
  PDF_FILENAME, PDF_FOOTER_TEXT,
} from "../constants.js"
import { buildPlayerStats } from "../game/scoring.js"

export function downloadMatchReport() {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()

  renderHeader(doc)
  renderMatchInfo(doc)
  renderPlayerStatsTable(doc)
  renderGameLogTable(doc)
  renderFooter(doc)

  doc.save(PDF_FILENAME)
}

function renderHeader(doc) {
  doc.setFillColor(...PDF_HEADER_COLOR)
  doc.rect(0, 0, 210, 25, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.text("Pickleball Match Report", 105, 15, { align: "center" })
  doc.setTextColor(0, 0, 0)
}

function renderMatchInfo(doc) {
  doc.setFontSize(12)
  doc.text("Final Score: " + gameState.scoreA + " - " + gameState.scoreB, 14, 40)
  doc.text(gameState.teamAName + ": " + gameState.players.a1 + " / " + gameState.players.a2, 14, 48)
  doc.text(gameState.teamBName + ": " + gameState.players.b1 + " / " + gameState.players.b2, 14, 55)
}

function renderPlayerStatsTable(doc) {
  const stats = buildPlayerStats(
    gameState.players, gameState.playerPoints,
    gameState.teamAName, gameState.teamBName,
  )

  doc.text("Player Points", 14, 70)
  doc.autoTable({
    startY: 74,
    head: [["Player", "Points"]],
    body: stats.map(p => [p.name, p.pts]),
    theme: "grid",
    headStyles: { fillColor: PDF_HEADER_COLOR },
  })
}

function renderGameLogTable(doc) {
  const logData = gameState.gameLog.slice().reverse().map(log => [
    log.id, log.event, log.score, log.server,
  ])

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["#", "Event", "Score", "Server"]],
    body: logData,
    theme: "striped",
    headStyles: { fillColor: PDF_LOG_HEADER_COLOR },
  })
}

function renderFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(PDF_FOOTER_TEXT, 105, 290, { align: "center" })
  }
}
