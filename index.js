// Collapsible sidebar

function sideBar() {
    document.getElementById("sidebar").classList.toggle("menuDisplay");
}

document.getElementById("sidebarButton").onclick = sideBar;

// Tab Switching Display Function

function tabDisplay(whichTab) {

    let feedContent = document.getElementsByClassName("contentFeed");
    for (let i = 0; i < feedContent.length; i++) {
        feedContent[i].classList.remove("contentDisplay");
    }
    let tabList = document.getElementsByClassName("folderTab");
    for (let i = 0; i < tabList.length; i++) {
        tabList[i].classList.remove("active");
    }

    document.getElementById(whichTab).classList.add("contentDisplay");
    document.getElementById("tab" + whichTab).classList.add("active");
}

//  All Tab Display

function allTabDisplay() {

    let feedContent = document.getElementsByClassName("contentFeed");
    for (let i = 0; i < feedContent.length; i++) {
        feedContent[i].classList.add("contentDisplay");
    }
    let tabList = document.getElementsByClassName("folderTab");
    for (let i = 0; i < tabList.length; i++) {
        tabList[i].classList.remove("active");
    }

    document.getElementById("tabAll").classList.add("active");
}


// Popup Forms and Form Folder List

function openForm (x) {
    document.getElementById(x).style.display = "block";
};

function closeForm (x) {
    document.getElementById(x).style.display = "none";
};

const folderList = ["All", "Weather", "News", "Comics"];

for (let i = 1; i < folderList.length; i++) {
    let radioContainer = document.getElementById("folderRadios");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "radio" + folderList[i];
    radio.name = "folderChoice";
    radio.value = folderList[i];
    radioContainer.appendChild(radio);

    let label = document.createElement("label");
    label.htmlFor = "radio" + folderList[i];
    label.innerHTML = folderList[i];
    radioContainer.appendChild(label);

    let lineBreak = document.createElement("br");
    radioContainer.appendChild(lineBreak);
}

// Creating new folders

function createFolder(){
    let folderName = document.getElementById('nfolder').value;

    folderList.push(folderName);

    let newFolder = document.createElement('div');
    newFolder.className = 'contentFeed';
    newFolder.id = folderName;

    document.getElementById('contentFolder').appendChild(newFolder);

    let newTab = document.createElement('button');
    newTab.className = 'folderTab';
    newTab.id = 'tab' + folderName;
    newTab.innerHTML = folderName;

    document.getElementById('folderTabs').appendChild(newTab);

}

// Adding Display Function to Buttons

let tabButtons = document.getElementsByClassName('folderTab');

for (let i = 1; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", function() {
        let tabID = folderList[i];
        tabDisplay(tabID);
    })
}

//  Fetching/Parsing RSS Data

async function getData(url) {
    let data = await fetch(url);
    let feedText = await data.text();
    const xmlDoc = new DOMParser().parseFromString(feedText, "text/xml");
    console.log(feedText);
    console.log(xmlDoc);
}

getData('https://feeds.megaphone.fm/strike-force-five');

getData("https://www.cbc.ca/webfeed/rss/rss-canada-newfoundland")