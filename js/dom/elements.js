import { MAX_TIMEOUT_DOTS } from "../constants.js"

export const dom = {
  setupScreen: null,
  gameScreen: null,

  nameA1: null,
  nameA2: null,
  nameB1: null,
  nameB2: null,
  teamANameInput: null,
  teamBNameInput: null,
  teamToggleBtn: null,
  startTeam: null,
  gameTo: null,
  timeouts: null,
  startTeamA: null,
  startTeamB: null,

  playerA1: null,
  playerA2: null,
  playerB1: null,
  playerB2: null,
  teamALabel: null,
  teamBLabel: null,
  rallyNum: null,

  timeoutDotsA: [],
  timeoutDotsB: [],

  serverName: null,
  btnTeamA: null,
  btnTeamB: null,
  undoButton: null,
  resetButton: null,
  timeoutAButton: null,
  timeoutBButton: null,
  downloadButton: null,

  logTableBody: null,

  winModal: null,
  winnerTitle: null,
  finalScore: null,
  mvpName: null,
  winDownloadButton: null,
  winCloseButton: null,

  resetModal: null,
  resetCancelButton: null,
  resetConfirmButton: null,

  undoModal: null,
  undoPassword: null,
  undoCancelButton: null,
  undoConfirmButton: null,

  startButton: null,
}

export function cacheDomElements() {
  dom.setupScreen = document.getElementById("setupScreen")
  dom.gameScreen = document.getElementById("gameScreen")

  dom.nameA1 = document.getElementById("nameA1")
  dom.nameA2 = document.getElementById("nameA2")
  dom.nameB1 = document.getElementById("nameB1")
  dom.nameB2 = document.getElementById("nameB2")
  dom.teamANameInput = document.getElementById("teamAName")
  dom.teamBNameInput = document.getElementById("teamBName")
  dom.teamToggleBtn = document.getElementById("teamToggleBtn")
  dom.startTeam = document.getElementById("startTeam")
  dom.gameTo = document.getElementById("gameTo")
  dom.timeouts = document.getElementById("timeouts")
  dom.startTeamA = document.getElementById("startTeamA")
  dom.startTeamB = document.getElementById("startTeamB")

  dom.playerA1 = document.getElementById("a1")
  dom.playerA2 = document.getElementById("a2")
  dom.playerB1 = document.getElementById("b1")
  dom.playerB2 = document.getElementById("b2")
  dom.teamALabel = document.getElementById("teamALabel")
  dom.teamBLabel = document.getElementById("teamBLabel")
  dom.rallyNum = document.getElementById("rallyNum")

  dom.timeoutDotsA = []
  dom.timeoutDotsB = []
  for (let i = 1; i <= MAX_TIMEOUT_DOTS; i++) {
    dom.timeoutDotsA.push(document.getElementById("a_to" + i))
    dom.timeoutDotsB.push(document.getElementById("b_to" + i))
  }

  dom.serverName = document.getElementById("serverName")
  dom.btnTeamA = document.getElementById("btnTeamA")
  dom.btnTeamB = document.getElementById("btnTeamB")
  dom.undoButton = document.querySelector(".btn.undo")
  dom.resetButton = document.querySelector(".btn.reset")
  dom.timeoutAButton = document.querySelector(".timeoutA-btn")
  dom.timeoutBButton = document.querySelector(".timeoutB-btn")
  dom.downloadButton = document.querySelector(".download-btn")

  dom.logTableBody = document.querySelector("#logTable tbody")

  dom.winModal = document.getElementById("winModal")
  dom.winnerTitle = document.getElementById("winnerTitle")
  dom.finalScore = document.getElementById("finalScore")
  dom.mvpName = document.getElementById("mvpName")
  dom.winDownloadButton = document.querySelector(".download-win")
  dom.winCloseButton = document.querySelector(".close-win")

  dom.resetModal = document.getElementById("resetModal")
  dom.resetCancelButton = document.querySelector(".reset-cancel")
  dom.resetConfirmButton = document.querySelector(".reset-confirm")

  dom.undoModal = document.getElementById("undoModal")
  dom.undoPassword = document.getElementById("undoPassword")

  const undoModalEl = dom.undoModal
  dom.undoCancelButton = undoModalEl.querySelector(".reset-cancel")
  dom.undoConfirmButton = undoModalEl.querySelector(".reset-confirm")

  const resetModalEl = dom.resetModal
  dom.resetCancelButton = resetModalEl.querySelector(".reset-cancel")
  dom.resetConfirmButton = resetModalEl.querySelector(".reset-confirm")

  dom.startButton = document.querySelector(".start-btn")
}
