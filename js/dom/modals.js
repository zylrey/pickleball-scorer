import { dom } from "./elements.js"

export function showWinModal(winnerName, finalScore, statsHtml) {
  dom.winnerTitle.innerText = winnerName + " Wins!"
  dom.finalScore.innerText = finalScore
  dom.mvpName.innerHTML = statsHtml
  dom.winModal.style.display = "flex"
}

export function hideWinModal() {
  dom.winModal.style.display = "none"
}

export function showResetModal() {
  dom.resetModal.style.display = "flex"
}

export function hideResetModal() {
  dom.resetModal.style.display = "none"
}

export function showUndoModal() {
  dom.undoPassword.value = ""
  dom.undoModal.style.display = "flex"
}

export function hideUndoModal() {
  dom.undoModal.style.display = "none"
}

export function getUndoPasswordValue() {
  return dom.undoPassword.value.trim()
}
