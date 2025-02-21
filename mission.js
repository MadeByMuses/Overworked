//Below is teh var that tells which Mission has the ID
var AssignedMissions = [];
var MissionsToDoLeft = -1;
var Metadata = [];
var Lives = -1;
var LastMissionInteracted = 0;
function MissionDetailer(id) {
    if (id < 0){
        document.getElementById("MissionName").textContent = "Custom Mission";
        document.getElementById("CustomMissionPanel").style.visibility = "visible";
        document.getElementById("MissionButton").style.visibility = "visible";
    }
}

function MissionStart() {
    AssignedMissions = [];
    let CancelMeeting = document.getElementById("Checkbox1").checked;

    if (!CancelMeeting){
        alert("Please pick at least one todo");
    }
    else if (isNaN(document.getElementById("TimerSeconds").innerHTML)){
        alert("Please insert the time limit for the custom mission")
    }
    else{ 
        LastMissionInteracted = 0;
        let IDsOfTasks = [];
        //Animate close
        Transition(false);
        //Close the window
        MissionsWindowClose();

        //Checks if it is tick and adds it to the list
        if(CancelMeeting){IDsOfTasks.push(1)}
        shuffle(IDsOfTasks);
        document.getElementById("ToDoListText").innerHTML=``;
        document.getElementById("PersonalPortalGrid").innerHTML = ``;
        IDsOfTasks.forEach(AddMission);
        MissionsToDoLeft = AssignedMissions.length;
        
        //Show icon
        document.getElementById("ToDoList").style.visibility = "visible";
        setTimeout(function(){
            Transition(true);
            document.getElementById("Timer").style.visibility = "visible";
            Lives = 3;
        },1000);
        setTimeout(function (){
            const now = new Date();
            countDownDate = AddMinutesToDate(now,Number(document.getElementById("TimerSeconds").value)/60);
            console.log(countDownDate)
        }),2300;
    }
}
 
function AddMission(ID, index) {
    const ToDoListText = document.getElementById("ToDoListText");
    console.log("HEY")
    switch (ID){
        case 1:
            console.log(index)
            ToDoListText.appendChild(CreateCancelMeeting(index));
    }
}

function CreateCancelMeeting(MissionIndex) {
    document.getElementById("PersonalPortal").style.visibility = "visible";
    AssignedMissions.push("CancelMeeting");
    const CancelMeetingPN = ["Delete a meeting","Cancel a meeting","Remove a planned meeting","Cut down on planned meetings","Make sure to reduce meetings"]
    const node = document.createElement('p')
    node.appendChild(document.createTextNode(CancelMeetingPN[Math.floor(Math.random()*CancelMeetingPN.length)]))
    node.setAttribute('id',"CancelMeeting" + String(MissionIndex))

    //Add element
    const Meetings = ["CEO","Orange County Juice","Read Books","Reeded Books","In Metahouse","No Meeting Corporation","Brick Music","Purple TV","Sea-Aeroplanes"]
    shuffle(Meetings); 
    Metadata.push(GetRandomInt(2,6))
    console.log(Metadata)
    console.log(97+String(Metadata[MissionIndex]).substring(0,1));
    document.getElementById("PersonalPortalGrid").innerHTML += `
        <div class="window">
            <div class="window-body" id="CancelMeeting`+MissionIndex+`">
                <h3>Meeting cancellation system</h3>
                <p>Please pick one meeting to cancel below:</p>`
    for (let i = 97; i <= (97+Number(String(Metadata[MissionIndex]).substring(0,1)));i++){
        document.getElementById("CancelMeeting"+MissionIndex).innerHTML += `
                <div class="field-row">
                    <input id="CancelMeetingRadio`+MissionIndex+String.fromCharCode(i)+`" type="radio" name="CancelMeetingRadio`+MissionIndex+`">
                    <label for="CancelMeetingRadio`+MissionIndex+String.fromCharCode(i)+`" id="CancelMeetingRadio`+MissionIndex+String.fromCharCode(i)+`text">`+Meetings[i-97]+`</label>
                </div>
        `
    }
    document.getElementById("CancelMeeting"+MissionIndex).innerHTML += `
            </div>
            <br>
            <button onclick="CancelMeetingCheck(`+MissionIndex+`)"style="margin-left: 20px;">Confirm Selection</button>
            <p id="CancelMeetingConfirmation`+MissionIndex+`"></p>
        </div>`
    return node;
}

function CancelMeetingCheck(MissionIndex){
    LastMissionInteracted = 1;
    let ThingsToChoose = [];
    for (let i = 97; i <= (97+Number(String(Metadata[MissionIndex]).substring(0,1)));i++){
        ThingsToChoose.push(document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(i)+"text").innerHTML)
    }
    if (ThingsToChoose.length == 3){
        console.log(ThingsToChoose[1])
        if (ThingsToChoose[1] == "Orange County Juice" || ThingsToChoose[1] == "Read Books"){
            console.log("A")
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
        }
        else if(ThingsToChoose.includes("No Meeting Corporation")){
            console.log("B")
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
        }
        else if(!ThingsToChoose.includes("Brick Music")){
            console.log("C")
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
        }
        else{
            console.log("D")
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
        }
    }
    else if (ThingsToChoose.length == 4){
        if (ThingsToChoose.includes("No Meeting Corporation") && ThingsToChoose.includes("In Metahouse")){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(Number(97)+Number(ThingsToChoose.indexOf("In Metahouse")))).checked == true){
                MissionComplete(MissionIndex,1);
            }
            else{
                MissionFail(MissionIndex,1)
            }
        }
        else if (ThingsToChoose.includes("Purple TV") && ThingsToChoose.includes("Reeded Books") && (Number(ThingsToChoose.indexOf("Purple TV"))<Number(ThingsToChoose.indexOf("Reeded Books")))){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if (ThingsToChoose.indexOf("Orange County Juice") == 3 || ThingsToChoose.indexOf("Orange County Juice") == 2){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if (!ThingsToChoose.includes("Brick Music")){         
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else{    
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
    }
    else if (ThingsToChoose.length == 5){
        if (ThingsToChoose.includes("In Metahouse") && TodayDate.getDay == 2){    
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if (ThingsToChoose.includes("Purple TV") && ThingsToChoose.includes("Sea-Aeroplanes") && ThingsToChoose.includes("Read Books")){    
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if (!ThingsToChoose.includes("CEO")){
            if (ThingsToChoose.includes("Purple TV")){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(Number(97)+Number(ThingsToChoose.indexOf("Purple TV")))).checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else if(ThingsToChoose.includes("Brick Music")){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(Number(97)+Number(ThingsToChoose.indexOf("Brick Music")))).checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else if(ThingsToChoose.includes("Read Books")){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(Number(97)+Number(ThingsToChoose.indexOf("Read Books")))).checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(Number(97)+Number(ThingsToChoose.indexOf("Reeded Books")))).checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
        }
        else if (ThingsToChoose.includes("No Meeting Corporation") && ThingsToChoose.indexOf("No Meeting Corporation") != 0 && ThingsToChoose.indexOf("No Meeting Corporation") != 4){    
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else{
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
    }
    else{
        if (ThingsToChoose.includes("In Meeting Corporation") && !ThingsToChoose.includes("Sea-Aeroplanes")){ 
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"e").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"f").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if(ThingsToChoose.indexOf("Purple TV") != 5 && ThingsToChoose.includes("Purple TV") && (TodayDate.getDay == 0 || TodayDate.getDay == 2)){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"f").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if(ThingsToChoose.includes("Orange County Juice") && ThingsToChoose.includes("Reeded Books")){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"f").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else if(!ThingsToChoose.includes("Brick Music")){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"e").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"f").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
        else{
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"f").innerHTML != "CEO"){
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"f").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            }
            else{
                if (document.getElementById("CancelMeetingRadio"+MissionIndex+"a").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"b").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"c").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"d").checked == true || document.getElementById("CancelMeetingRadio"+MissionIndex+"e").checked == true){
                    MissionComplete(MissionIndex,1);
                }
                else{
                    MissionFail(MissionIndex,1)
                }
            } 
        }
    }
}  

function MissionComplete(MissionIndex,MissionID){
    document.getElementById("ToDoListText").children[MissionIndex].style.textDecoration = "line-through";
    MissionsToDoLeft -= 1;
    if (MissionID == 1){
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).innerHTML = "Your request has been accepted!"
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).style.color = "ForestGreen";
    }
}

function MissionFail(MissionIndex,MissionID){
    Lives -= 1;
    if (MissionID == 1){
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).innerHTML = "Your request has FAILED since it is against policy's code"
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).style.color = "Red";
    }
}

//Fail checker
setInterval(function(){
    if (Lives == 0){
        Lives = -1
        Transition(false)
        document.getElementById("MissionCheckInText").innerHTML = `
        <h2>You have failed...</h2>
        <p>You have failed miserably, we must remind you that the current you is not fit for this company. Therefore, with support of HR, we have terminated pay for today's work. We were specifically shocked at your `
        if (LastMissionInteracted == 0){
            document.getElementById("MissionCheckInText").innerHTML += `inability to effectively time manage.`
        }
        else if (LastMissionInteracted == 1){
            document.getElementById("MissionCheckInText").innerHTML += `pathetic attempt to cancel a meeting.`
        }
        document.getElementById("MissionCheckInText").innerHTML += `<br><br>We hope you can improve for the sake of our proud company.<br>You may close this message...`
        setTimeout(function(){document.getElementById("MissionCheckIn").style.visibility = "visible";PersonalPortalWindowClose();MissionsWindowClose();ToDoListWindowClose();SettingsWindowClose()},400)
    }
    else if(MissionsToDoLeft == 0){
        MissionsToDoLeft = -1;
        Lives = -1;
        setTimeout(function(){
        Transition(false)
        const now = new Date();
        const TimeLeft = countDownDate - now;
        let minutes = Math.floor((TimeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((TimeLeft % (1000 * 60)) / 1000);
        seconds = seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
        document.getElementById("MissionCheckInText").innerHTML = `
        <h2>Targets reached</h2>
        <p>You have completed what we expected of you, so under our own company rulings we cannot congratulate you. However, please take note that Jenny on the desk will now be more likely to not steal your sandwhich (HR NOTE: This cannot be promised, only hoped). The remaining time on the clock was <b>`+minutes+`:`+seconds+`</b>. Remember, effort means results!<br><br>You may close this window.</p>`
        MissionsToDoLeft = -1;
        setTimeout(function(){document.getElementById("MissionCheckIn").style.visibility = "visible";PersonalPortalWindowClose();MissionsWindowClose();ToDoListWindowClose();SettingsWindowClose()},400)
        },3000)
    }
},1)


function Transition(reveal){
    if (!reveal){
        document.getElementById("Blocker").style.visibility = "visible";
        document.getElementById("Blocker").style.backgroundColor = "rgba(0, 0, 0, 1)";
    }
    else{
        document.getElementById("Blocker").style.backgroundColor = "rgba(0, 0, 0, 0)";
        setTimeout(function(){document.getElementById("Blocker").style.visibility = "hidden";}, 400)
    }
}