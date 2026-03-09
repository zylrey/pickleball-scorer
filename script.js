let scoreA=0
let scoreB=0
let historyStack = []

let servingTeam="A"
let serverNumber=2
let server="a2"

let teamASwapped=false
let teamBSwapped=false
let firstServiceTurn=true

let rallyCount=0

let teamAName="Team A"
let teamBName="Team B"

let players={a1:"P1",a2:"P2",b1:"P3",b2:"P4"}

function openSettings(){
document.getElementById("settingsModal").style.display="flex"
document.body.classList.add("modal-open")
}

function closeSettings(){
document.getElementById("settingsModal").style.display="none"
document.body.classList.remove("modal-open")
}

function startGame(){

teamAName=document.getElementById("teamAName").value||"Team A"
teamBName=document.getElementById("teamBName").value||"Team B"

players.a1=document.getElementById("nameA1").value||"P1"
players.a2=document.getElementById("nameA2").value||"P2"
players.b1=document.getElementById("nameB1").value||"P3"
players.b2=document.getElementById("nameB2").value||"P4"

document.getElementById("a1").innerText=players.a1
document.getElementById("a2").innerText=players.a2
document.getElementById("b1").innerText=players.b1
document.getElementById("b2").innerText=players.b2

closeSettings()
resetGame()

}

function resetGame(){

scoreA=0
scoreB=0

servingTeam="A"
serverNumber=2
server="a2"

teamASwapped=false
teamBSwapped=false
firstServiceTurn=true

rallyCount=0
document.querySelector("#logTable tbody").innerHTML=""

updateUI()

}

function rallyWinner(team){

saveState()

if(team===servingTeam){
scorePoint(team)
logEvent((team==="A"?teamAName:teamBName)+" won rally")
}else{
loseServe()
logEvent((team==="A"?teamAName:teamBName)+" won rally")
}

updateUI()

}

function scorePoint(team){

if(team==="A"){
scoreA++
teamASwapped=!teamASwapped
}else{
scoreB++
teamBSwapped=!teamBSwapped
}

firstServiceTurn=false
}

function loseServe(){

if(firstServiceTurn){
sideOut()
firstServiceTurn=false
return
}

if(serverNumber===1){
serverNumber=2
server=getPartner(server)
}else{
sideOut()
}

}

function sideOut(){
servingTeam=servingTeam==="A"?"B":"A"
serverNumber=1
updateServerFromScore()
}

function updateServerFromScore(){

if(servingTeam==="A"){
const even=scoreA%2===0
server=even?(teamASwapped?"a1":"a2"):(teamASwapped?"a2":"a1")
}else{
const even=scoreB%2===0
server=even?(teamBSwapped?"b2":"b1"):(teamBSwapped?"b1":"b2")
}

}

function getPartner(p){
return {a1:"a2",a2:"a1",b1:"b2",b2:"b1"}[p]
}

function logEvent(event){

rallyCount++

let callScore

if(servingTeam==="A"){
callScore=scoreA+"-"+scoreB+"-"+serverNumber
}else{
callScore=scoreB+"-"+scoreA+"-"+serverNumber
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

function updateUI(){

let callScore

if(servingTeam==="A"){
callScore=scoreA+"-"+scoreB+"-"+serverNumber
}else{
callScore=scoreB+"-"+scoreA+"-"+serverNumber
}

document.getElementById("serverName").innerText=callScore

document.querySelectorAll(".player").forEach(p=>p.classList.remove("serving"))
document.getElementById(server).classList.add("serving")

renderPositions()

}

function renderPositions(){

const a1=document.getElementById("a1")
const a2=document.getElementById("a2")
const b1=document.getElementById("b1")
const b2=document.getElementById("b2")

if(teamASwapped){
a1.style.top="auto";a1.style.bottom="15%"
a2.style.bottom="auto";a2.style.top="15%"
}else{
a1.style.bottom="auto";a1.style.top="15%"
a2.style.top="auto";a2.style.bottom="15%"
}

if(teamBSwapped){
b1.style.top="auto";b1.style.bottom="15%"
b2.style.bottom="auto";b2.style.top="15%"
}else{
b1.style.bottom="auto";b1.style.top="15%"
b2.style.top="auto";b2.style.bottom="15%"
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
firstServiceTurn,
rallyCount

})

}

function downloadLog(){

const rows=document.querySelectorAll("#logTable tr")

let csv=[]

rows.forEach(row=>{
const cols=row.querySelectorAll("th,td")
let rowData=[]
cols.forEach(col=>rowData.push(col.innerText))
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

function undoAction(){

if(historyStack.length===0) return

const prev = historyStack.pop()

scoreA = prev.scoreA
scoreB = prev.scoreB
servingTeam = prev.servingTeam
serverNumber = prev.serverNumber
server = prev.server
teamASwapped = prev.teamASwapped
teamBSwapped = prev.teamBSwapped
firstServiceTurn = prev.firstServiceTurn
rallyCount = prev.rallyCount

const rows = document.querySelector("#logTable tbody")
rows.removeChild(rows.firstChild)

updateUI()

}