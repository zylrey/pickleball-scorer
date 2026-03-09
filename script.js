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



function startGame(){

players.a1 = document.getElementById("nameA1").value || "P1"
players.a2 = document.getElementById("nameA2").value || "P2"
players.b1 = document.getElementById("nameB1").value || "P3"
players.b2 = document.getElementById("nameB2").value || "P4"

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
server = "a2"

teamASwapped = false
teamBSwapped = false

historyStack = []
rallyCount = 0

document.querySelector("#logTable tbody").innerHTML = ""

updateUI()

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

updateUI()
return

}

if(serverNumber === 1){

serverNumber = 2
server = getPartner(server)

logEvent("Server Change")

updateUI()
return

}

sideOut()

logEvent("Side Out")

updateUI()

}



function scorePoint(team){

if(team === "A"){

scoreA++
teamASwapped = !teamASwapped
server = teamASwapped ? "a1" : "a2"

}else{

scoreB++
teamBSwapped = !teamBSwapped
server = teamBSwapped ? "b1" : "b2"

}

}



function sideOut(){

servingTeam = servingTeam === "A" ? "B" : "A"
serverNumber = 1

if(servingTeam === "A"){
server = teamASwapped ? "a1" : "a2"
}else{
server = teamBSwapped ? "b1" : "b2"
}

}



function getPartner(p){

if(p==="a1") return "a2"
if(p==="a2") return "a1"
if(p==="b1") return "b2"
if(p==="b2") return "b1"

}



function updateUI(){

let callScore

if(servingTeam==="A"){
callScore = scoreA+"-"+scoreB+"-"+serverNumber
}else{
callScore = scoreB+"-"+scoreA+"-"+serverNumber
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

a1.style.top="15%"
a1.style.bottom="auto"
a2.style.bottom="15%"
a2.style.top="auto"

}

if(teamBSwapped){

b1.style.top="auto"
b1.style.bottom="15%"
b2.style.bottom="auto"
b2.style.top="15%"

}else{

b1.style.top="15%"
b1.style.bottom="auto"
b2.style.bottom="15%"
b2.style.top="auto"

}

}



function logEvent(event){

rallyCount++

let callScore

if(servingTeam==="A"){
callScore = scoreA+"-"+scoreB+"-"+serverNumber
}else{
callScore = scoreB+"-"+scoreA+"-"+serverNumber
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

document.querySelector("#logTable tbody").removeChild(
document.querySelector("#logTable tbody").firstChild
)

updateUI()

}



function downloadLog(){

const rows=document.querySelectorAll("#logTable tr")

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