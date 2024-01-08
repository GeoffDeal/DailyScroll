// localStorage.clear();
// Storing and Retrieving Folder Settings
let storedFolders;
let folderList = JSON.parse(localStorage.getItem("storedFolders"));

if (folderList === null){
    folderList = ["Comics"];
 }
 

function addFolder() {

    if (typeof(Storage) !== undefined) {
        
        let folderName = document.getElementById('nfolder').value;
        folderList.push(folderName);
        let folderString = JSON.stringify(folderList);
        localStorage.setItem("storedFolders",folderString);
    
     } else {
        console.log("Local storage not supported")
     }
}

// Clear Local Storage Button

function clearSettings (){
    if (confirm("Are you sure you wish to clear settings?")){
        localStorage.clear();
        location.reload();
    }
}

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


for (let i = 0; i < folderList.length; i++) {
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

// Creating folders

for ( i=0; i < folderList.length; i++) {

    let newFolder = document.createElement('div');
    newFolder.className = 'contentFeed';
    newFolder.id = folderList[i];

    document.getElementById('contentFolder').appendChild(newFolder);

    let newTab = document.createElement('button');
    newTab.className = 'folderTab';
    newTab.id = 'tab' + folderList[i];
    newTab.innerHTML = folderList[i];

    document.getElementById('folderTabs').appendChild(newTab);

}

// Adding Display Function to Buttons

let tabButtons = document.getElementsByClassName('folderTab');

for (let i = 1; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", function() {
        let tabID = folderList[i-1];
        tabDisplay(tabID);
    })
}

//  Fetching/Parsing RSS Data

async function getData(url) {
    console.log("Trying...");
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error("Could Not Retrieve Data");
    }
    let feedText = await data.text();
    const xmlDoc = new DOMParser().parseFromString(feedText, "text/xml");
    console.log("Got Feed!");
    return xmlDoc;
}

// Construct Content Cards

function cardConstruct(xml) {
    let itemsList = xml.getElementsByTagName('item');
    for (let i = 0; i < itemsList.length ; i++) {
        console.log(itemsList[i])
        let linkWrapper = document.createElement('a');
        let parentFolder = document.getElementById('Comics');
        parentFolder.appendChild(linkWrapper);

        const itemLink = itemsList[i].getElementsByTagName('link')[0].textContent;
        linkWrapper.href = itemLink;

        let newCard = document.createElement('div');
        linkWrapper.appendChild(newCard);
        newCard.className = "contentCard";

        let newButton = document.createElement('button');
        newButton.className = "cardButton";
        newButton.innerHTML = "<i class='fa-solid fa-bars'></i>"
        newCard.appendChild(newButton);

        const itemTitle = itemsList[i].getElementsByTagName('title')[0].textContent;
        let newTitle = document.createElement('h3');
        newCard.appendChild(newTitle);
        newTitle.innerHTML = itemTitle;

        const itemDesc = itemsList[i].getElementsByTagName('description')[0].textContent;
        let newDesc = document.createElement('p');
        newCard.appendChild(newDesc);
        newDesc.innerHTML = itemDesc;

        const itemDate = itemsList[i].getElementsByTagName('pubDate')[0].textContent;
        let newDate = document.createElement('p');
        newCard.appendChild(newDate);
        newDate.innerHTML = itemDate;
    }

}


// Display test

// async function displayContent (xmlDocument) {
//     let articleTitles = xmlDocument.getElementsByTagName('title');
//     for (i = 0; i < articleTitles.length; i++) {
//         console.log(articleTitles[i].textContent)
//     }
// }

// getData("https://feeds.megaphone.fm/strike-force-five")
//     .then(cardConstruct)   
// getData("https://www.cbc.ca/webfeed/rss/rss-canada-newfoundland")
//     .then(cardConstruct)
getData("https://smbc-rss-plus.mindflakes.com/rss.xml")
    .then(cardConstruct)
// getData("https://xkcd.com/rss.xml")
//     .then(cardConstruct)
    
