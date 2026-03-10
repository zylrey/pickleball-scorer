import { dom } from "../dom/elements.js"
import { DEFAULT_TEAM_A_NAME, DEFAULT_TEAM_B_NAME } from "../constants.js"

export function readSetupForm() {
  return {
    players: {
      a1: dom.nameA1.value || "P1",
      a2: dom.nameA2.value || "P2",
      b1: dom.nameB1.value || "P3",
      b2: dom.nameB2.value || "P4",
    },
    teamAName: dom.teamANameInput.value || DEFAULT_TEAM_A_NAME,
    teamBName: dom.teamBNameInput.value || DEFAULT_TEAM_B_NAME,
    servingTeam: dom.startTeam.value,
    gamePoint: parseInt(dom.gameTo.value),
    timeoutLimit: parseInt(dom.timeouts.value),
  }
}

export function handleToggleTeamNames() {
  const inputA = dom.teamANameInput
  const inputB = dom.teamBNameInput
  const btn = dom.teamToggleBtn

  if (inputA.style.display === "none" || inputA.style.display === "") {
    inputA.style.display = "block"
    inputB.style.display = "block"
    btn.innerText = "Remove"
  } else {
    inputA.style.display = "none"
    inputB.style.display = "none"
    btn.innerText = "Add"
    inputA.value = ""
    inputB.value = ""
  }
}

export function handleTeamDropdownUpdate() {
  const teamAName = dom.teamANameInput.value || DEFAULT_TEAM_A_NAME
  const teamBName = dom.teamBNameInput.value || DEFAULT_TEAM_B_NAME
  dom.startTeamA.innerText = teamAName
  dom.startTeamB.innerText = teamBName
}
