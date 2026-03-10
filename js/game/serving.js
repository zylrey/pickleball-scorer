import {
  TEAM_A,
  PLAYER_A1, PLAYER_A2, PLAYER_B1, PLAYER_B2,
} from "../constants.js"

export function getRightSideServer(servingTeam, teamASwapped, teamBSwapped) {
  if (servingTeam === TEAM_A) {
    return teamASwapped ? PLAYER_A1 : PLAYER_A2
  }
  return teamBSwapped ? PLAYER_B2 : PLAYER_B1
}

export function getPartner(player) {
  const partnerMap = {
    [PLAYER_A1]: PLAYER_A2,
    [PLAYER_A2]: PLAYER_A1,
    [PLAYER_B1]: PLAYER_B2,
    [PLAYER_B2]: PLAYER_B1,
  }
  return partnerMap[player]
}
