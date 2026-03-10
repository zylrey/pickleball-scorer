import { dom } from "./elements.js"
import { COURT_OFFSET, POSITION_AUTO } from "../constants.js"

export function renderScore(callScore) {
  dom.serverName.innerText = callScore
}

export function renderServerHighlight(serverKey) {
  document.querySelectorAll(".player").forEach(p => {
    p.classList.remove("serving")
  })
  document.getElementById(serverKey).classList.add("serving")
}

export function renderPositions(teamASwapped, teamBSwapped) {
  positionPlayerPair(dom.playerA1, dom.playerA2, teamASwapped)
  positionPlayerPair(dom.playerB1, dom.playerB2, teamBSwapped)
}

function positionPlayerPair(topPlayer, bottomPlayer, isSwapped) {
  if (isSwapped) {
    topPlayer.style.top = POSITION_AUTO
    topPlayer.style.bottom = COURT_OFFSET
    bottomPlayer.style.bottom = POSITION_AUTO
    bottomPlayer.style.top = COURT_OFFSET
  } else {
    topPlayer.style.bottom = POSITION_AUTO
    topPlayer.style.top = COURT_OFFSET
    bottomPlayer.style.top = POSITION_AUTO
    bottomPlayer.style.bottom = COURT_OFFSET
  }
}

export function renderPlayerNames(players) {
  dom.playerA1.innerText = players.a1
  dom.playerA2.innerText = players.a2
  dom.playerB1.innerText = players.b1
  dom.playerB2.innerText = players.b2
}

export function renderTeamLabels(teamAName, teamBName) {
  dom.teamALabel.innerText = teamAName
  dom.teamBLabel.innerText = teamBName
}

export function renderRallyCount(count) {
  dom.rallyNum.innerText = count
}

export function renderTimeoutDots(timeoutA, timeoutB, limit) {
  dom.timeoutDotsA.forEach((dot, i) => {
    if (dot) dot.classList.remove("used")
  })
  dom.timeoutDotsB.forEach((dot, i) => {
    if (dot) dot.classList.remove("used")
  })
  for (let i = 0; i < timeoutA; i++) {
    if (dom.timeoutDotsA[i]) dom.timeoutDotsA[i].classList.add("used")
  }
  for (let i = 0; i < timeoutB; i++) {
    if (dom.timeoutDotsB[i]) dom.timeoutDotsB[i].classList.add("used")
  }
}

export function renderLogTable(gameLog) {
  dom.logTableBody.innerHTML = ""
  gameLog.forEach(log => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${log.id}</td>
      <td class="${log.class}">${log.event}</td>
      <td>${log.score}</td>
      <td>${log.server}</td>
    `
    dom.logTableBody.appendChild(row)
  })
}

export function renderButtonLabels(teamAName, teamBName) {
  dom.btnTeamA.innerText = teamAName + " Won Rally"
  dom.btnTeamB.innerText = teamBName + " Won Rally"
}

export function showScreen(showGame) {
  dom.setupScreen.style.display = showGame ? "none" : "block"
  dom.gameScreen.style.display = showGame ? "block" : "none"
}

export function disableGameButtons() {
  dom.btnTeamA.disabled = true
  dom.btnTeamB.disabled = true
  dom.undoButton.disabled = true

  dom.btnTeamA.style.opacity = ".5"
  dom.btnTeamB.style.opacity = ".5"
  dom.undoButton.style.opacity = ".5"
}

export function enableGameButtons() {
  dom.btnTeamA.disabled = false
  dom.btnTeamB.disabled = false
  dom.undoButton.disabled = false

  dom.btnTeamA.style.opacity = "1"
  dom.btnTeamB.style.opacity = "1"
  dom.undoButton.style.opacity = "1"
}
