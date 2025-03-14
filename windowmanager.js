let windowopen = false;

const daysoftheweek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let TodayDate = new Date;
document.getElementById("TodayIs").innerHTML = "Today is: " + daysoftheweek[TodayDate.getDay()]

let WeatherID = Math.floor(Math.random()*5)
if (WeatherID == 0){
  document.getElementById("WeatherIcon").src="Images/Weather/Odd.png"
  document.getElementById("WeatherIcon").setAttribute('alt', 'Odd Weather')
}
else if (WeatherID == 1){
  document.getElementById("WeatherIcon").src="Images/Weather/Sunny.png"
  document.getElementById("WeatherIcon").setAttribute('alt', 'Sunny Weather')
}
else if (WeatherID == 2){
  document.getElementById("WeatherIcon").src="Images/Weather/Cloudy.png"
  document.getElementById("WeatherIcon").setAttribute('alt', 'Cloudy Weather')
}
else if (WeatherID == 3){
  document.getElementById("WeatherIcon").src="Images/Weather/Snowy.png"
  document.getElementById("WeatherIcon").setAttribute('alt', 'Snowy Weather')
}
else if (WeatherID == 4){
  document.getElementById("WeatherIcon").src="Images/Weather/Thunder.png"
  document.getElementById("WeatherIcon").setAttribute('alt', 'Thunder Weather')
}

//Make the DIV element draggagle:
DragElement(document.getElementById("SettingsWindow"));
DragElement(document.getElementById("MissionsWindow"));
DragElement(document.getElementById("ToDoListWindow"));
DragElement(document.getElementById("PersonalPortalWindow"));
DragElement(document.getElementById("TutorialWindow"))
DragElement(document.getElementById("Timer"))
function DragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Clickable 
document.getElementById('Settings').addEventListener('click', SettingsWindowOpen);
function SettingsWindowOpen() {
  if (!windowopen) {
    windowopen = true
    document.getElementById('SettingsWindow').style.visibility = "visible";
    document.getElementById('BackgroundWindow').style.visibility = "visible";
  }
}
function SettingsWindowClose() {
    windowopen = false
    document.getElementById('SettingsWindow').style.visibility = "hidden";
    document.getElementById('BackgroundWindow').style.visibility = "hidden";
}

document.getElementById('ToDoList').addEventListener('click', ToDoListWindowOpen);
function ToDoListWindowOpen() {
  if (!windowopen){
    windowopen = true
    document.getElementById('ToDoListWindow').style.visibility = "visible";
    document.getElementById('BackgroundWindow').style.visibility = "visible";
  }
}
function ToDoListWindowClose() {
    windowopen = false
    document.getElementById('ToDoListWindow').style.visibility = "hidden";
    document.getElementById('BackgroundWindow').style.visibility = "hidden";
}

document.getElementById('Missions').addEventListener('click', MissionsWindowOpen);
function MissionsWindowOpen() {
  if (!windowopen){
    windowopen = true
    document.getElementById('MissionsWindow').style.visibility = "visible";
    document.getElementById('BackgroundWindow').style.visibility = "visible";
  }
}
function MissionsWindowClose() {
  windowopen = false
  document.getElementById('MissionsWindow').style.visibility = "hidden";
  document.getElementById('BackgroundWindow').style.visibility = "hidden";
  document.getElementById("MissionButton").style.visibility = "";
}

document.getElementById('PersonalPortal').addEventListener('click', PersonalPortalWindowOpen);
function PersonalPortalWindowOpen() {
  if(!windowopen){
    windowopen = true
    document.getElementById('PersonalPortalWindow').style.visibility = "visible";
    document.getElementById('BackgroundWindow').style.visibility = "visible";
  }
}
function PersonalPortalWindowClose() {
    windowopen = false
    document.getElementById('PersonalPortalWindow').style.visibility = "hidden";
    document.getElementById('BackgroundWindow').style.visibility = "hidden";
}

document.getElementById('Tutorial').addEventListener('click', TutorialWindowOpen);
function TutorialWindowOpen() {
  if(!windowopen){
    windowopen = true
    document.getElementById('TutorialWindow').style.visibility = "visible";
    document.getElementById('BackgroundWindow').style.visibility = "visible";
  }
}
function TutorialWindowClose() {
    windowopen = false
    document.getElementById('TutorialWindow').style.visibility = "hidden";
    document.getElementById('BackgroundWindow').style.visibility = "hidden";
}




//This is for the timer
var countDownDate;

// Update the count down every 1 second
let TimerText = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  seconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  // Display the result in the element with id="demo"
  document.getElementById("TimerText").innerHTML =minutes + ":" + seconds;

  // If the count down is finished, write some text
  if(typeof Lives !== 'undefined' && Lives == -1){
    document.getElementById("TimerText").innerHTML = "XX:XX";
  }
  if (distance < 0) {
    if (Lives != -1){Lives = 0;}
    countDownDate = AddMinutesToDate(countDownDate,65535);
  }
}, 100);


function BackToMainMenu(){
  setTimeout(function(){Transition(true)},1000)
  if (document.getElementById("TutorialCheck") !== null){
    if (document.getElementById("TutorialCheck").checked == false){
      document.getElementById("Tutorial").style.visibility = "visible";
    }

  }
  document.getElementById("ManualArchive").style.visibility = "hidden";
  document.getElementById("MissionCheckIn").style.visibility = "hidden";
  document.getElementById("Timer").style.visibility = "hidden";
  document.getElementById("ToDoList").style.visibility = "hidden";
  document.getElementById("PersonalPortal").style.visibility = "hidden";
	document.getElementById("SideMissionBox").innerHTML = "";
}