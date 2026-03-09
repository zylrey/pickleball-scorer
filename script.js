let scoreA = 0
let scoreB = 0

let servingTeam = "A"
let serverNumber = 2
let server = "a2"

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

let startSide = "right"
let gamePoint = 11


function startGame(){

players.a1 = document.getElementById("nameA1").value || "P1"
players.a2 = document.getElementById("nameA2").value || "P2"
players.b1 = document.getElementById("nameB1").value || "P3"
players.b2 = document.getElementById("nameB2").value || "P4"

startSide = document.getElementById("startSide").value
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


function resetGame(){

scoreA = 0
scoreB = 0

servingTeam = "A"
serverNumber = 2

teamASwapped = false
teamBSwapped = false

server = getRightSideServer()

historyStack = []
rallyCount = 0

document.querySelector("#logTable tbody").innerHTML = ""

updateUI()

}


function getRightSideServer(){

if(servingTeam === "A"){

// Team A right box = bottom left
return teamASwapped ? "a1" : "a2"

}else{

// Team B right box = bottom right
return teamBSwapped ? "b1" : "b2"

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
teamBSwapped

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

}


function scorePoint(team){

if(team === "A"){

scoreA++
teamASwapped = !teamASwapped

}else{

scoreB++
teamBSwapped = !teamBSwapped

}

// SERVER DOES NOT CHANGE

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

const row=document.createElement("tr")

row.innerHTML=`
<td>${rallyCount}</td>
<td class="${colorClass}">${event}</td>
<td>${callScore}</td>
<td>${players[server]}</td>
`

document.querySelector("#logTable tbody").prepend(row)

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

const table = document.querySelector("#logTable tbody")

if(table.firstChild){
table.removeChild(table.firstChild)
}

updateUI()

}


function downloadLog(){

const rows = document.querySelectorAll("#logTable tr")

let csv=[]

rows.forEach(row=>{

const cols=row.querySelectorAll("th,td")

let rowData=[]

cols.forEach(col=>{
rowData.push(col.innerText)
})

csv.push(rowData.join(","))

})

const blob=new Blob([csv.join("\n")],{type:"text/csv"})
const url=window.URL.createObjectURL(blob)

const a=document.createElement("a")

a.href=url
a.download="pickleball_game_log.csv"

document.body.appendChild(a)

a.click()

document.body.removeChild(a)

}