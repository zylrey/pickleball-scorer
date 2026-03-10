import { LOG_CLASS_MAP } from "../constants.js"

export function createLogEntry(rallyId, eventType, callScore, serverName) {
  return {
    id: rallyId,
    event: eventType,
    score: callScore,
    server: serverName,
    class: LOG_CLASS_MAP[eventType] || "",
  }
}

export function addLogEntry(gameLog, entry) {
  gameLog.unshift(entry)
}

export function removeLastLogEntry(gameLog) {
  gameLog.shift()
}
