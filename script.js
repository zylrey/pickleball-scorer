let scoreA = 0
let scoreB = 0

let servingTeam = "A"
let serverNumber = 2
let server = "a2"

let gameLog = []

let teamASwapped = false
let teamBSwapped = false

let historyStack = []
let rallyCount = 0

let players = {
a1:"P1",
a2:"P2",
b1:"P3",
b2:"P4"
}

let playerPoints = {
a1:0,
a2:0,
b1:0,
b2:0
}

let startSide = "right"
let gamePoint = 11


function saveMatch(){

const state = {

scoreA,
scoreB,
servingTeam,
serverNumber,
server,
teamASwapped,
teamBSwapped,
rallyCount,
players,
gameLog,
playerPoints

}

localStorage.setItem(
"pickleball_match",
JSON.stringify(state)
)

}

function loadMatch(){

const saved = localStorage.getItem("pickleball_match")

if(!saved) return

const state = JSON.parse(saved)

scoreA = state.scoreA
scoreB = state.scoreB
servingTeam = state.servingTeam
serverNumber = state.serverNumber
server = state.server
teamASwapped = state.teamASwapped
teamBSwapped = state.teamBSwapped
rallyCount = state.rallyCount
players = state.players
playerPoints = state.playerPoints || playerPoints

document.getElementById("setupScreen").style.display="none"
document.getElementById("gameScreen").style.display="block"

document.getElementById("a1").innerText = players.a1
document.getElementById("a2").innerText = players.a2
document.getElementById("b1").innerText = players.b1
document.getElementById("b2").innerText = players.b2

updateUI()

gameLog = state.gameLog || []

renderLog()

/* disable buttons if match already finished */

if(
(scoreA >= gamePoint && scoreA - scoreB >= 2) ||
(scoreB >= gamePoint && scoreB - scoreA >= 2)
){
disableGame()
}
}


function startGame(){

players.a1 = document.getElementById("nameA1").value || "P1"
players.a2 = document.getElementById("nameA2").value || "P2"
players.b1 = document.getElementById("nameB1").value || "P3"
players.b2 = document.getElementById("nameB2").value || "P4"

servingTeam = document.getElementById("startTeam").value

gamePoint = parseInt(document.getElementById("gameTo").value)

document.getElementById("setupScreen").style.display="none"
document.getElementById("gameScreen").style.display="block"

document.getElementById("a1").innerText = players.a1
document.getElementById("a2").innerText = players.a2
document.getElementById("b1").innerText = players.b1
document.getElementById("b2").innerText = players.b2

resetGame()

logEvent("Game Start")

}


function resetMatch(){

document.getElementById("resetModal").style.display = "flex"

}

function closeResetModal(){

document.getElementById("resetModal").style.display = "none"

}

function confirmReset(){

localStorage.removeItem("pickleball_match")

location.reload()

}


function resetGame(){

scoreA = 0
scoreB = 0

serverNumber = 2

teamASwapped = false
teamBSwapped = false

playerPoints = {
a1:0,
a2:0,
b1:0,
b2:0
}

server = getRightSideServer()

historyStack = []
rallyCount = 0
gameLog = []

document.querySelector("#logTable tbody").innerHTML = ""

updateUI()
saveMatch()

}


function getRightSideServer(){

if(servingTeam === "A"){

// bottom-left box
return teamASwapped ? "a1" : "a2"

}else{

// top-right box
return teamBSwapped ? "b2" : "b1"

}

}


function saveState(){

historyStack.push({

scoreA,
scoreB,
servingTeam,
serverNumber,
server,
teamASwapped,
teamBSwapped,
playerPoints: {...playerPoints}

})

}


function rallyWinner(team){

saveState()

if(team === servingTeam){

scorePoint(team)
logEvent("Point")

}else{

if(serverNumber === 1){

serverNumber = 2
server = getPartner(server)

logEvent("Server Change")

}else{

sideOut()
logEvent("Side Out")

}

}

updateUI()

saveMatch()
}


function scorePoint(team){

if(team === "A"){

scoreA++
teamASwapped = !teamASwapped

}else{

scoreB++
teamBSwapped = !teamBSwapped

}

playerPoints[server]++

checkGameWin()

}


function sideOut(){

servingTeam = servingTeam === "A" ? "B" : "A"

serverNumber = 1

server = getRightSideServer()

}


function getPartner(player){

if(player === "a1") return "a2"
if(player === "a2") return "a1"
if(player === "b1") return "b2"
if(player === "b2") return "b1"

}


function updateUI(){

let callScore

if(servingTeam === "A"){
callScore = scoreA + "-" + scoreB + "-" + serverNumber
}else{
callScore = scoreB + "-" + scoreA + "-" + serverNumber
}

document.getElementById("serverName").innerText = callScore

document.querySelectorAll(".player").forEach(p=>{
p.classList.remove("serving")
})

document.getElementById(server).classList.add("serving")

renderPositions()

}


function renderPositions(){

const a1 = document.getElementById("a1")
const a2 = document.getElementById("a2")
const b1 = document.getElementById("b1")
const b2 = document.getElementById("b2")

if(teamASwapped){

a1.style.top="auto"
a1.style.bottom="15%"

a2.style.bottom="auto"
a2.style.top="15%"

}else{

a1.style.bottom="auto"
a1.style.top="15%"

a2.style.top="auto"
a2.style.bottom="15%"

}

if(teamBSwapped){

b1.style.top="auto"
b1.style.bottom="15%"

b2.style.bottom="auto"
b2.style.top="15%"

}else{

b1.style.bottom="auto"
b1.style.top="15%"

b2.style.top="auto"
b2.style.bottom="15%"

}

}


function logEvent(event){

rallyCount++

let callScore

if(servingTeam === "A"){
callScore = scoreA + "-" + scoreB + "-" + serverNumber
}else{
callScore = scoreB + "-" + scoreA + "-" + serverNumber
}

let colorClass=""

if(event==="Point") colorClass="log-point"
if(event==="Server Change") colorClass="log-change"
if(event==="Side Out") colorClass="log-sideout"
if(event==="Game Start") colorClass="log-start"
if(event==="Win") colorClass="log-win"

const logEntry = {
id:rallyCount,
event:event,
score:callScore,
server:players[server],
class:colorClass
}

gameLog.unshift(logEntry)

renderLog()
saveMatch()

}


function undoAction(){

if(historyStack.length === 0) return

const prev = historyStack.pop()

scoreA = prev.scoreA
scoreB = prev.scoreB
servingTeam = prev.servingTeam
serverNumber = prev.serverNumber
server = prev.server
teamASwapped = prev.teamASwapped
teamBSwapped = prev.teamBSwapped
playerPoints = {...prev.playerPoints}

gameLog.shift()

renderLog()
updateUI()
saveMatch()

}

function renderLog(){

const tbody = document.querySelector("#logTable tbody")

tbody.innerHTML=""

gameLog.forEach(log=>{

const row=document.createElement("tr")

row.innerHTML=`
<td>${log.id}</td>
<td class="${log.class}">${log.event}</td>
<td>${log.score}</td>
<td>${log.server}</td>
`

tbody.appendChild(row)

})

}


function downloadLog(){

const { jsPDF } = window.jspdf
const doc = new jsPDF()

/* HEADER */

doc.setFillColor(34,197,94)
doc.rect(0,0,210,25,"F")

doc.setTextColor(255,255,255)
doc.setFontSize(18)
doc.text("Pickleball Match Report",105,15,{align:"center"})

doc.setTextColor(0,0,0)

/* MATCH INFO */

doc.setFontSize(12)

doc.text("Final Score: " + scoreA + " - " + scoreB,14,40)

doc.text("Team A: " + players.a1 + " / " + players.a2,14,48)
doc.text("Team B: " + players.b1 + " / " + players.b2,14,55)

/* PLAYER STATS */

let stats = [
{name:players.a1, pts:playerPoints.a1},
{name:players.a2, pts:playerPoints.a2},
{name:players.b1, pts:playerPoints.b1},
{name:players.b2, pts:playerPoints.b2}
]

stats.sort((a,b)=>b.pts-a.pts)

doc.text("Player Points",14,70)

doc.autoTable({

startY:74,

head:[["Player","Points"]],

body:stats.map(p=>[p.name,p.pts]),

theme:"grid",

headStyles:{
fillColor:[34,197,94]
}

})

/* GAME LOG */

let logData = gameLog.slice().reverse().map(log=>[
log.id,
log.event,
log.score,
log.server
])

doc.autoTable({

startY:doc.lastAutoTable.finalY + 10,

head:[["#", "Event", "Score", "Server"]],

body:logData,

theme:"striped",

headStyles:{
fillColor:[59,130,246]
}

})

/* FOOTER */

let pageCount = doc.internal.getNumberOfPages()

for(let i=1;i<=pageCount;i++){

doc.setPage(i)

doc.setFontSize(10)

doc.text(
"Generated by Pickleball Scorer",
105,
290,
{align:"center"}
)

}

doc.save("pickleball_match_report.pdf")

}

function checkGameWin(){

let winner = null

if(scoreA >= gamePoint && scoreA - scoreB >= 2){
winner = "A"
}

if(scoreB >= gamePoint && scoreB - scoreA >= 2){
winner = "B"
}

if(!winner) return

let stats = [
{key:"a1", name:players.a1, pts:playerPoints.a1},
{key:"a2", name:players.a2, pts:playerPoints.a2},
{key:"b1", name:players.b1, pts:playerPoints.b1},
{key:"b2", name:players.b2, pts:playerPoints.b2}
]

stats.sort((a,b)=>b.pts-a.pts)

let mvp = stats[0]

let output = "MVP: " + mvp.name + " - " + mvp.pts + " pts<br><br>"

stats.slice(1).forEach(p=>{
output += p.name + " - " + p.pts + " pts<br>"
})

document.getElementById("winnerTitle").innerText =
"Team " + winner + " Wins!"

document.getElementById("finalScore").innerText =
scoreA + " - " + scoreB

document.getElementById("mvpName").innerHTML = output

logEvent("Win")

document.getElementById("winModal").style.display = "flex"

disableGame()

}

function closeWinModal(){

document.getElementById("winModal").style.display="none"

}

function disableGame(){

document.querySelector(".teamA").disabled = true
document.querySelector(".teamB").disabled = true
document.querySelector(".undo").disabled = true

document.querySelector(".teamA").style.opacity = ".5"
document.querySelector(".teamB").style.opacity = ".5"
document.querySelector(".undo").style.opacity = ".5"

}

window.onload = loadMatch