let scoreA = 0
let scoreB = 0

let servingTeam = "A"
let serverNumber = 2
let server = "a2"

let players = {
a1:"P1",
a2:"P2",
b1:"P3",
b2:"P4"
}

let historyStack = []
let rallyCount = 0

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

server = startSide === "right" ? "a2" : "a1"

historyStack=[]
rallyCount=0

document.querySelector("#logTable tbody").innerHTML=""

updateUI()

}

function saveState(){

historyStack.push({

scoreA,
scoreB,
servingTeam,
serverNumber,
server

})

}

function rallyWinner(team){

saveState()

if(team === servingTeam){

scorePoint(team)
logEvent("Point")

}else{

loseServe()
logEvent("Side Out")

}

updateUI()

}

function scorePoint(team){

if(team==="A") scoreA++
else scoreB++

}

function loseServe(){

if(serverNumber === 1){

serverNumber = 2
server = getPartner(server)

}else{

sideOut()

}

}

function sideOut(){

servingTeam = servingTeam==="A"?"B":"A"
serverNumber = 1

server = servingTeam==="A"?"a1":"b1"

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

}

function logEvent(event){

rallyCount++

let callScore

if(servingTeam==="A"){
callScore = scoreA+"-"+scoreB+"-"+serverNumber
}else{
callScore = scoreB+"-"+scoreA+"-"+serverNumber
}

const row=document.createElement("tr")

row.innerHTML=`
<td>${rallyCount}</td>
<td>${event}</td>
<td>${callScore}</td>
<td>${players[server]}</td>
`

document.querySelector("#logTable tbody").prepend(row)

}

function undoAction(){

if(historyStack.length===0) return

const prev = historyStack.pop()

scoreA = prev.scoreA
scoreB = prev.scoreB
servingTeam = prev.servingTeam
serverNumber = prev.serverNumber
server = prev.server

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