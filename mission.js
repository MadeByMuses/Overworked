//Below is the var that tells which Mission has the ID
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
    let StaffBonuses = document.getElementById("Checkbox2").checked;

    if (!CancelMeeting && !StaffBonuses){
        alert("Please pick at least one todo");
    }
    else if (isNaN(document.getElementById("TimerSeconds").innerHTML) || (document.getElementById("TimerSeconds").innerHTML.indexOf(' ') >= 0)){
        alert("Please insert the time limit for the custom mission or no spaces in the box")
    }
    else{ 
        Metadata = [];
        LastMissionInteracted = 0;
        let IDsOfTasks = [];
        //Animate close
        Transition(false);
        //Close the window
        MissionsWindowClose();

        //Checks if it is tick and adds it to the list
        if(CancelMeeting){IDsOfTasks.push(1)}
        if(StaffBonuses){IDsOfTasks.push(2)}
        shuffle(IDsOfTasks);
        document.getElementById("ToDoListText").innerHTML=``;
        document.getElementById("PersonalPortalGrid").innerHTML = ``;
        IDsOfTasks.forEach(AddMission);
        MissionsToDoLeft = AssignedMissions.length;
        
        //Show icon
        setTimeout(function(){
            Transition(true);
            document.getElementById("ToDoList").style.visibility = "visible";
            document.getElementById("ManualArchive").style.visibility = "visible";
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
    console.log(ID + "..." + index)
    const ToDoListText = document.getElementById("ToDoListText");
    switch (ID){
        case 1:
            ToDoListText.appendChild(CreateCancelMeeting(index));
            break;
        case 2:
            ToDoListText.appendChild(CreateStaffBonuses(index));
            break;
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

function CreateStaffBonuses(MissionIndex) {
    document.getElementById("PersonalPortal").style.visibility = "visible";
    AssignedMissions.push("StaffBonuses");
    const StaffBonusesPN = ["Add staff bonuses","Order bonuses for staff","Update extras for staff wages","Order staff for finacial bonuses","Order staff bonuses","Add ranking for staff's bonuses"]
    const node = document.createElement('p')
    node.appendChild(document.createTextNode(StaffBonusesPN[Math.floor(Math.random()*StaffBonusesPN.length)]))
    node.setAttribute('id',"StaffBonuses" + String(MissionIndex))

    //Add element
    const Meetings = ["CEO","Orange County Juice","Read Books","Reeded Books","In Metahouse","No Meeting Corporation","Brick Music","Purple TV","Sea-Aeroplanes"]
    shuffle(Meetings); 
    Metadata.push(GetRandomInt(0,4))
    let PossibleOptions = [0,1,2,3,4,5,6,7]
    shuffle(PossibleOptions)
    const Column1 = ["Timothy","Lisa","Chris","Henry","Kevin","Mark","Marc","Juliet"]
    const Column2 = ["Kevin","Hannah","Ryan","Sarah","Lily","Brenda","Amelia","Edgar"]
    const Column3 = ["Lilly","Louie","Henry","Romeo","Ryen","Owen","Oliver","Una"]
    const Column4 = ["Oonagh","Tim","Sara","Marc","Luke","Louis","Hanna","Riley"]
    document.getElementById("PersonalPortalGrid").innerHTML += `
        <div class="window">
            <div class="window-body" id="StaffBonuses`+MissionIndex+`">
                <h3>Staff bonuses system</h3>
                <p>Please pick one meeting to cancel below:</p>`
    for (let i = 97; i < (97+4);i++){
        document.getElementById("StaffBonuses"+MissionIndex).innerHTML += `
            <div class="field-row">
                <select id="StaffBonuses`+MissionIndex+String.fromCharCode(i)+`">
                    <option value=0>Select ranking</option>
                    <option value=4>1st to get the Bonus</option>
                    <option value=3>2nd in queue to get the Bonus</option>
                    <option value=2>3rd expected to recieve the Bonus</option>
                    <option value=1>4th likely to be award with the Bonus</option>
                </select>
                <label id="StaffBonusesText`+MissionIndex+String.fromCharCode(i)+`">`
        if (Metadata[MissionIndex] == 1){
            document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i)).innerHTML += Column1[PossibleOptions[i-97]]
        }
        else if (Metadata[MissionIndex] == 2){
            document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i)).innerHTML += Column2[PossibleOptions[i-97]]
        }
        else if (Metadata[MissionIndex] == 3){
            document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i)).innerHTML += Column3[PossibleOptions[i-97]]
        }
        else if (Metadata[MissionIndex] == 4){
            document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i)).innerHTML += Column4[PossibleOptions[i-97]]
        }
        document.getElementById("StaffBonuses"+MissionIndex).innerHTML += `</label>
            </div>
        `
    }
    document.getElementById("StaffBonuses"+MissionIndex).innerHTML += `
            </div>
            <br>
            <button onclick="StaffBonusesCheck(`+MissionIndex+`)"style="margin-left: 20px;">Confirm Selection</button>
            <p id="StaffBonusesConfirmation`+MissionIndex+`"></p>
        </div>`
    return node;
}

function CancelMeetingCheck(MissionIndex){
    console.log(document.getElementById("CancelMeetingRadio"+MissionIndex+"a").innerHTML);
    LastMissionInteracted = 1;
    let ThingsToChoose = [];
    for (let i = 97; i <= (97+Number(String(Metadata[MissionIndex]).substring(0,1)));i++){
        ThingsToChoose.push(document.getElementById("CancelMeetingRadio"+MissionIndex+String.fromCharCode(i)+"text").innerHTML)
    }
    if (ThingsToChoose.length == 3){

        if (ThingsToChoose[1] == "Orange County Juice" || ThingsToChoose[1] == "Read Books"){
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"atext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"atext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"ctext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"btext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"dtext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"ctext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"atext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"dtext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"ctext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"btext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"btext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"dtext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"etext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"atext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"ctext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"etext").innerHTML != "CEO"){
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
            if (document.getElementById("CancelMeetingRadio"+MissionIndex+"ftext").innerHTML != "CEO"){
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

function StaffBonusesCheck(MissionIndex){
    LastMissionInteracted = 2;
    const Column1 = ["Timothy","Lisa","Chris","Henry","Kevin","Mark","Marc","Juliet"]
    const Column2 = ["Kevin","Hannah","Ryan","Sarah","Lily","Brenda","Amelia","Edgar"]
    const Column3 = ["Lilly","Louie","Henry","Romeo","Ryen","Owen","Oliver","Una"]
    const Column4 = ["Oonagh","Tim","Sara","Marc","Luke","Louis","Hanna","Riley"]
    let NameID = new Array;
    for (let i =0; i< 4; i++){
        if (Metadata[MissionIndex] == 1){
            NameID.push(Column1.indexOf(document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i+97)).innerHTML))
        }
        else if (Metadata[MissionIndex] == 2){
            NameID.push(Column2.indexOf(document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i+97)).innerHTML))
        }
        else if (Metadata[MissionIndex] == 3){
            NameID.push(Column3.indexOf(document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i+97)).innerHTML))
        }
        else if (Metadata[MissionIndex] == 4){
            NameID.push(Column4.indexOf(document.getElementById("StaffBonusesText"+MissionIndex+String.fromCharCode(i+97)).innerHTML))
        }
    }
    console.log(NameID);
    let NameIDRanked = rankings(NameID);
    console.log(NameIDRanked);
    if (NameIDRanked[0] == document.getElementById("StaffBonuses"+MissionIndex+"a").value && NameIDRanked[1] == document.getElementById("StaffBonuses"+MissionIndex+"b").value && NameIDRanked[2] == document.getElementById("StaffBonuses"+MissionIndex+"c").value && NameIDRanked[3] == document.getElementById("StaffBonuses"+MissionIndex+"d").value ){
        MissionComplete(MissionIndex,2)
    }
    else{
        MissionFail(MissionIndex,2)
    }
}

function MissionComplete(MissionIndex,MissionID){
    document.getElementById("ToDoListText").children[MissionIndex].style.textDecoration = "line-through";
    MissionsToDoLeft -= 1;
    if (MissionID == 1){
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).innerHTML = "Your request has been accepted!"
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).style.color = "ForestGreen";
    }
    else if(MissionID == 2){
        document.getElementById("StaffBonusesConfirmation"+MissionIndex).innerHTML = "The ranking is correctly chosen!"
        document.getElementById("StaffBonusesConfirmation"+MissionIndex).style.color = "ForestGreen";
    }
}

function MissionFail(MissionIndex,MissionID){
    Lives -= 1;
    if (MissionID == 1){
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).innerHTML = "Your request has FAILED since it is against policy's code"
        document.getElementById("CancelMeetingConfirmation"+MissionIndex).style.color = "Red";
    }
    else if(MissionID == 2){
        document.getElementById("StaffBonusesConfirmation"+MissionIndex).innerHTML = "This ranking has failed Omnicorp standards"
        document.getElementById("StaffBonusesConfirmation"+MissionIndex).style.color = "Red";
    }
}

//Fail checker
setInterval(function(){
    if (Lives == 0){
        Lives = -1
        Transition(false)
        document.getElementById("MissionCheckInText").innerHTML = `
        <h2>You have failed...</h2>
        <p>You have failed miserably, we must remind you that the current you is not fit for Omnicorp. Therefore, with support of HR, we have terminated pay for today's work. We were specifically shocked at your `
        if (LastMissionInteracted == 0){
            document.getElementById("MissionCheckInText").innerHTML += `inability to effectively time manage.`
        }
        else if (LastMissionInteracted == 1){
            document.getElementById("MissionCheckInText").innerHTML += `pathetic attempt to cancel a meeting.`
        }
        else if (LastMissionInteracted == 2){
            document.getElementById("MissionCheckInText").innerHTML += `disappointing enthusiams to order bonuses for Omnicorp staff.`
        }
        document.getElementById("MissionCheckInText").innerHTML += `<br><br>We hope you can improve for the sake of our proud company, Omnicorp.<br>You may close this message...`
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