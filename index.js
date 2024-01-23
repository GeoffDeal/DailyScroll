
// Retrieving folder and feed settings

// let storedFolders;
let folderList = JSON.parse(localStorage.getItem("storedFolders"));

if (folderList === null){
    folderList = [];
 }

//  let storedFeeds;
 let rssList = JSON.parse(localStorage.getItem("storedFeeds"));

 if (rssList === null) {
    rssList = [];
 }
 
// Adding new folder

function addFolder() {

    if (typeof(Storage) !== undefined) {
        
        let folderName = document.getElementById('nfolder').value;
        if (folderName !== ''){
            folderList.push(folderName);
            let folderString = JSON.stringify(folderList);
            localStorage.setItem("storedFolders",folderString);
        } else {
            closeForm('folderForm');
        }
    
     } else {
        console.log("Local storage not supported")
     }
}

// Feed object constructor

function Feed(name, url, folder) {
    this.name = name;
    this.url = url;
    this.folder = folder;
} 

function saveFeed() {

    let feedName = document.getElementById('feedname').value;
    let feedLink = document.getElementById('feedlink').value;
    let radios = document.getElementsByName('folderChoice');
    let selectedRadio;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedRadio = radios[i].value;
        }
    }
    try {
        if (feedName === '' || feedLink === '' || selectedRadio === undefined){
            throw "Please fill in all fields.";
        }
        else {
            const newFeed = new Feed(feedName, feedLink, selectedRadio);
            rssList.push(newFeed);
            let feedString = JSON.stringify(rssList);
            localStorage.setItem("storedFeeds", feedString);
        }
    }
    catch (err) {
        alert(err)
    }
}

// Edit/Remove Feeds Feed List

for (let i = 0; i < rssList.length; i++) {
    let radioContainer = document.getElementById("feedRadiosList");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "radio" + rssList[i].name;
    radio.name = "feedRadios";
    radio.value = i;
    radioContainer.appendChild(radio);

    let label = document.createElement("label");
    label.htmlFor = "radio" + rssList[i].name;
    label.innerHTML = rssList[i].name;
    radioContainer.appendChild(label);

    let lineBreak = document.createElement("br");
    radioContainer.appendChild(lineBreak);
}

// Delete Feed

function deleteFeed() {
    let radios = document.getElementsByName('feedRadios');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedRadio = radios[i].value;
        }
    }
    try {
        if (selectedRadio === undefined) {
            throw "Please select a feed.";
        }
        else {
            if (confirm("Are you sure you wish to delete this feed?")){
                rssList.splice(selectedRadio, 1);
                let feedString = JSON.stringify(rssList);
                localStorage.setItem("storedFeeds", feedString);
                closeForm('editFeedForm');
            }
        }
    }
    catch (err) {
        alert(err);
    }
}


// Collapsible sidebar

function sideBar() {
    document.getElementById("sidebar").classList.toggle("menuDisplay");
}

document.getElementById("sidebarButton").onclick = sideBar;

// Clear Local Storage Button

function clearSettings (){
    if (confirm("Are you sure you wish to clear settings?")){
        localStorage.clear();
        location.reload();
    }
}

// Setup Weather Widget

function createWeather() {
    let newFolder = document.createElement('div');
    newFolder.className = 'contentFeed';
    newFolder.id = "Weather";

    document.getElementById('contentFolder').appendChild(newFolder);

    let newTab = document.createElement('button');
    newTab.className = 'folderTab';
    newTab.id = 'tabWeather';
    newTab.innerHTML = 'Weather';

    document.getElementById('folderTabs').appendChild(newTab);
}

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

const cardArray = [];


function cardConstruct(xml, folder) {
    let itemsList = xml.getElementsByTagName('item');
    for (let i = 0; i < itemsList.length ; i++) {
        let linkWrapper = document.createElement('a');
        let parentFolder = document.getElementById(folder);
        parentFolder.appendChild(linkWrapper);

        if (itemsList[i].getElementsByTagName('link')[0] !== undefined){
            const itemLink = itemsList[i].getElementsByTagName('link')[0].textContent;
            linkWrapper.href = itemLink;
        }

        let newCard = document.createElement('div');
        linkWrapper.appendChild(newCard);
        newCard.className = "contentCard";

        let newButton = document.createElement('button');
        newButton.className = "cardButton";
        newButton.innerHTML = "<i class='fa-solid fa-bars'></i>"
        newCard.appendChild(newButton);

        let itemTitle = itemsList[i].getElementsByTagName('title')[0].textContent;
        let newTitle = document.createElement('h3');
        newCard.appendChild(newTitle);
        newTitle.innerHTML = itemTitle;

        let itemDesc = itemsList[i].getElementsByTagName('description')[0].textContent;
        let newDesc = document.createElement('p');
        newCard.appendChild(newDesc);
        newDesc.innerHTML = itemDesc;

        let itemDate = itemsList[i].getElementsByTagName('pubDate')[0].textContent;
        let newDate = document.createElement('p');
        newCard.appendChild(newDate);
        newDate.innerHTML = itemDate;

        itemDate = itemDate.replace(/\w{3}, /,'');
        timestamp = Date.parse(itemDate);
        newCard.id = timestamp;
        cardArray.push(timestamp);
    }

}
// Card Sorting and Display


function getAllFeeds (array) {
    for (let i =0 ; i < array.length; i++) {
        let url = array[i].url;
        let folder = array[i].folder;
        getData(url)
            .then((xml) => cardConstruct(xml, folder))
        }
}

// Joshua's getAllFeeds

// function getAllFeeds(array) {
//     const promises = array.map(url => getData(url).then(xml => cardConstruct(xml)));
//     return Promise.all(promises);
// }

// testObject = new Feed("SMBC", "https://smbc-rss-plus.mindflakes.com/rss.xml", "Comics");
// rssList.push(testObject);
// console.log(testObject.folder);

getAllFeeds(rssList);
console.log(rssList);
// console.log(cardArray);
// console.log(typeof cardArray[0]);
// cardArray.sort(function(a, b){return a - b});
// console.log(cardArray);






// Additional feeds:
// https://xkcd.com/rss.xml
// https://feeds.megaphone.fm/strike-force-five
// https://www.cbc.ca/webfeed/rss/rss-canada-newfoundland
// https://www.comicsrss.com/rss/garfield.rss
// https://smbc-rss-plus.mindflakes.com/rss.xml

