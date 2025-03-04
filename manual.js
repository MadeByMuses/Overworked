var Manuals = new Array();
const ManualGrid = document.getElementById("ManualGrid")

// Welcome Manual
Manuals[0] = new Array("welcome","introduction","help","basic","basics","idk","picasso","???","basics","what","who","when","where","why","?","home","entrance","how","what");
const Manual0 = `
            <div id="Manual0" onclick="OpenPDF(0)">
                <div class="ManualPDFIcon">
                    <img src="Images/OfficialPDF.png" alt="OfficialPDF Icon" class="icon" style="width: 50px;">
                </div>
                <p class="icon-text">Welcome Manual</p>
            </div>`;
// To cancel a meeting
Manuals[1] = new Array("cancel","meeting","personalportal","p-portal","personalportal","remove","delete","clear","meetings","session","reject","cancellation","pportal","meet");
const Manual1 = `
            <div id="Manual1">
                <div class="ManualPDFIcon" onclick="OpenPDF(1)">
                    <img src="Images/PersonalPortalPDF.png" alt="PersonalPortalPDF Icon" class="icon" style="width: 50px;">
                </div>
                <p class="icon-text">Meeting Cancellation</p>
            </div>`;
// Meeting Transcript about stock prices
Manuals[2] = new Array("transcript","meeting","stock","price","prices","details","talk","session","derek","prue","lenny")
const Manual2 =`
            <div id="Manual2">
                <div class="ManualPDFIcon" onclick="OpenPDF(2)">
                    <img src="Images/DescriptionPDF.png" alt="DescriptionPDF Icon" class="icon" style="width: 50px;">
                </div>
                <p class="icon-text">Stock Price Meeting Transcript</p>
            </div>`;
// The PDF which cannot be deleted since it is coded into the engine
Manuals[3] = new Array("error","PDF","delete","deleted","unwanted","ignore","picasso")
const Manual3 =`
            <div id="Manual3">
                <div class="ManualPDFIcon" onclick="OpenPDF(3)">
                    <img src="Images/DescriptionPDF.png" alt="DesciprtionPDF Icon" class="icon" style="width: 50px;">
                </div>
                <p class="icon-text">This cannot be deleted</p>
            </div>`;
// What to do if a staff member is cancelled
Manuals[4] = new Array("cancel","cancelled","staff","media","controversy","controversal","stop","important","surgery")
const Manual4 =`
            <div id="Manual4">
                <div class="ManualPDFIcon" onclick="OpenPDF(4)">
                    <img src="Images/DescriptionPDF.png" alt="DescritionPDF Icon" class="icon" style="width: 50px;">
                </div>
                <p class="icon-text">What to do if you are cancelled</p>
            </div>`;
// staff bonuses
Manuals[5] = new Array("finance","money","staff","wages","bonuses","extra","add","increase","change","order","rank","detail","bonus","money")
const Manual5 =`
            <div id="Manual5">
                <div class="ManualPDFIcon" onclick="OpenPDF(5)">
                    <img src="Images/PersonalPortalPDF.png" alt="PersonalPortalPDF Icon" class="icon" style="width: 50px;">
                </div>
                <p class="icon-text">Staff bonuses</p>
            </div>`
function updateValue() {
    ManualGrid.innerHTML = ``;
    console.log(document.getElementById("Keyword").value)
    for (let i=0;i<Manuals.length;i++){
        if (Manuals[i].includes((document.getElementById("Keyword").value).toLowerCase())){
           switch (i){
                case(0):
                    ManualGrid.innerHTML += Manual0; 
                    break;
                case(1):
                    ManualGrid.innerHTML += Manual1;
                     break;
                case(2):
                    ManualGrid.innerHTML += Manual2;
                    break;
                case(3):
                    ManualGrid.innerHTML += Manual3;
                    break;
                case(4):
                    ManualGrid.innerHTML += Manual4;
                    break;
                case(5):
                    ManualGrid.innerHTML += Manual5;
                    break;
           }
        }
    }
}

function OpenPDF(pdfnumber){
    const myWindow = window.open();
    switch (pdfnumber){
        case(0):
            myWindow.document.open();
            myWindow.document.write(`<title>Welcome Manual</title><link rel="icon" type="image/x-icon" href="Images/ManualArchive.png"><embed src="PDFs/WelcomeManual.pdf" width="100%" height="100%" />`);
            myWindow.document.close();
            break;
        case(1):
            myWindow.document.open();
            myWindow.document.write(`<title>To Cancel A Meeting</title><link rel="icon" type="image/x-icon" href="Images/ManualArchive.png"><embed src="PDFs/ToCancelAMeeting.pdf" width="100%" height="100%" />`);
            myWindow.document.close();
            break;
        case(2):
            myWindow.document.open();
            myWindow.document.write(`<title>Transcript Stock Meeting</title><link rel="icon" type="image/x-icon" href="Images/ManualArchive.png"><embed src="PDFs/TranscriptStockMeeting.pdf" width="100%" height="100%" />`);
            myWindow.document.close();
            break;
        case(3):
            myWindow.document.open();
            myWindow.document.write(`<title>This Cannot Be Deleted</title><link rel="icon" type="image/x-icon" href="Images/ManualArchive.png"><embed src="PDFs/ThisCannotBeDeleted.pdf" width="100%" height="100%" />`);
            myWindow.document.close();
            break;
        case(4):
            myWindow.document.open();
            myWindow.document.write(`<title>If You Are Cancelled</title><link rel="icon" type="image/x-icon" href="Images/ManualArchive.png"><embed src="PDFs/IfYouAreCancelled.pdf" width="100%" height="100%" />`);
            myWindow.document.close();
            break;
        case(5):
            myWindow.document.open();
            myWindow.document.write(`<title>Order Bonuses</title><link rel="icon" type="image/x-icon" href="Images/ManualArchive.png"><embed src="PDFs/OrderBonuses.pdf" width="100%" height="100%" />`);
            myWindow.document.close();
    }
}