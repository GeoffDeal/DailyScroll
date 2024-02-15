// Retrieving folder and feed settings

let folderList = JSON.parse(localStorage.getItem("storedFolders"));

if (folderList === null){
    folderList = [];
 }


 let rssList = JSON.parse(localStorage.getItem("storedFeeds"));

 if (rssList === null) {
    rssList = [];
 }
 
// Adding new folder

document.getElementById('folderButton').addEventListener("click", function() {openForm('folderForm')});
document.getElementById('addFolderForm').addEventListener("submit", addFolder);
document.getElementById('cancelFolderButton').addEventListener("click", function() {closeForm('folderForm')});

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

document.getElementById('feedButton').addEventListener("click", function() {openForm('feedForm')});
document.getElementById('addFeedForm').addEventListener("submit", saveFeed);
document.getElementById('cancelFeedButton').addEventListener("click", function() {closeForm('feedForm')});

function Feed(name, url, folder) {
    this.name = name;
    this.url = url;
    this.folder = folder;
} 

function saveFeed() {

    let feedName = document.getElementById('feedname').value;
    let feedLink = document.getElementById('feedlink').value;
    let radios = document.getElementsByName('folderChoiceNew');
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
    console.log(rssList);
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

    // let lineBreak = document.createElement("br");
    // radioContainer.appendChild(lineBreak);
}

// Edit Feed

document.getElementById('editRemoveButton').addEventListener("click", function() {openForm('editFeedForm')});
document.getElementById('editFeedButton').addEventListener("click", editFeed);
document.getElementById('cancelEditButton').addEventListener("click", function() {closeForm('editFeedForm')});


function radioCheck(radioList) {
    let radios = document.getElementsByName(radioList);
    let selectedRadio = -1;
    for (let i=0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedRadio = radios[i].value;
        }
    }
    try {
        if (selectedRadio === -1) {
            throw "Please select a feed";
        }
        else {
            return selectedRadio;
        }
    }
    catch(err) {
        alert(err);
    }
}
let changingFeed = "";

function editFeed() {
    const feedObject = rssList[radioCheck('feedRadios')];
    changingFeed = rssList[radioCheck('feedRadios')];
    if (feedObject !== undefined) {
        openForm('feedChangesForm');
        document.getElementById('feedChangeHeader').innerHTML = "Editing "+feedObject.name;
        document.getElementById('feedNameChange').value = feedObject.name;
        document.getElementById('feedUrlChange').value = feedObject.url;
        document.getElementById("radio" + feedObject.folder + "2").checked = true;
        closeForm('editFeedForm');
        console.log(changingFeed);
    }
} 

document.getElementById("editConfirmButton").addEventListener("click", editFeedConfirm);

function editFeedConfirm() {
    if (confirm("Make these changes?")) {
        let ind = rssList.findIndex(obj => obj === changingFeed);
        rssList[ind].name = document.getElementById('feedNameChange').value;
        rssList[ind].url = document.getElementById('feedUrlChange').value;
        rssList[ind].folder = radioCheck("folderChoiceEdit");
        let feedString = JSON.stringify(rssList);
        localStorage.setItem("storedFeeds", feedString);
        changingFeed = "";
        closeForm('feedChangesForm');
    }
}

document.getElementById("cancelEditFeedButton").addEventListener("click", cancelEdit);

function cancelEdit() {
    closeForm('feedChangesForm');
    changingFeed = "";
}


// Delete Feed

document.getElementById('deleteFeedButton').addEventListener("click", deleteFeed);

function deleteFeed() {
    const feedDeleted = radioCheck('feedRadios');
    if (feedDeleted !== undefined) {
        if (confirm("Are you sure you wish to delete this feed?")){
            rssList.splice(feedDeleted, 1);
            let feedString = JSON.stringify(rssList);
            localStorage.setItem("storedFeeds", feedString);
            closeForm('editFeedForm');
        }
    }
}


// Collapsible sidebar

document.getElementById("sidebarButton").onclick = sideBar;

function sideBar() {
    document.getElementById("sidebar").classList.toggle("menuDisplay");
}

// Clear Local Storage Button

document.getElementById('clearSettingsButton').addEventListener("click", clearSettings);

function clearSettings (){
    if (confirm("Are you sure you wish to clear settings?")){
        localStorage.clear();
        location.reload();
    }
}

// Setup Weather Widget

document.getElementById('weatherFormButton').addEventListener("click", function() {openForm('weatherForm')});
document.getElementById('addWeatherForm').addEventListener("submit", createWeather);
document.getElementById('cancelWeatherButton').addEventListener("click", function() {closeForm('weatherForm')});

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

// Switch tab active

function activeTab(tab) {
    let tabList = document.getElementsByClassName("folderTab");
    for (let i = 0; i < tabList.length; i++) {
        tabList[i].classList.remove("active");
    }
    document.getElementById("tab" + tab).classList.add("active");
}



// Tab Switching Display Function

function tabDisplay(whichTab) {

    let chosenTab = document.getElementById('tab' + whichTab);
    if (chosenTab.classList.contains("active") !== true) {
        
        const textDiv = document.getElementById('textDiv');
        while (textDiv.firstChild){
            textDiv.removeChild(textDiv.firstChild);
        }
        articleArray.sort((a, b) => {b - a
            x = a.pubDate.replace(/\w{3}, /,'');
            timestampA = Date.parse(x);
            y = b.pubDate.replace(/\w{3}, /,'');
            timestampB = Date.parse(y);
            return timestampB - timestampA;
        });
        n = 0;
        displayTen(whichTab);
        activeTab(whichTab);
    }
}

// Adding Display Function to Buttons

let tabButtons = document.getElementsByClassName('folderTab');

for (let i = 1; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", function() {
        let tabID = folderList[i-1];
        tabDisplay(tabID);
    })
}

//  All Tab Display

document.getElementById("tabAll").addEventListener("click", allTabDisplay);

function allTabDisplay() {

    let chosenTab = document.getElementById('tabAll');
    if (chosenTab.classList.contains("active") !== true){
        const textDiv = document.getElementById('textDiv');
        while (textDiv.firstChild){
            textDiv.removeChild(textDiv.firstChild);
        }
        activeTab('All');
        articleArray.sort((a, b) => {b - a
            x = a.pubDate.replace(/\w{3}, /,'');
            timestampA = Date.parse(x);
            y = b.pubDate.replace(/\w{3}, /,'');
            timestampB = Date.parse(y);
            return timestampB - timestampA;
        });
        n = 0;
        displayTen();
    }
}

// Display content function

let n = 0;

function displayTen (folderTab) {
    let count = 0
    displayContent(count, folderTab);
}
function displayContent (count, folderTab) {
    let feedLength = articleArray.length;
    if (n < feedLength && count < 10) {
        if (folderTab === undefined){
            cardConstruct(articleArray[n]);
            count++;
        }
        else {
            if(articleArray[n].folder === folderTab) {
                cardConstruct(articleArray[n]);
                count++;
            }
        }
        n++;
        displayContent(count, folderTab);
}
}

// Load more on scroll

window.addEventListener('scroll', loadMore);

function loadMore() {
   
    if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 10) {
        console.log("Loading more");
        displayTen();
    }
}

// Popup Forms and Form Folder List

function openForm (x) {
    document.getElementById(x).style.display = "block";
};

function closeForm (x) {
    document.getElementById(x).style.display = "none";
};

function folderListCreate (container, idNum, uniqueName) {
    for (let i = 0; i < folderList.length; i++) {
        let radioContainer = document.getElementById(container);
    
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "radio" + folderList[i] + idNum;
        radio.name = "folderChoice" + uniqueName;
        radio.value = folderList[i];
        radioContainer.appendChild(radio);
    
        let label = document.createElement("label");
        label.htmlFor = "radio" + folderList[i];
        label.innerHTML = folderList[i];
        radioContainer.appendChild(label);
    
        let lineBreak = document.createElement("br");
        radioContainer.appendChild(lineBreak);
    }
}
folderListCreate("folderRadios", 1, "New");
folderListCreate("feedFolderChange", 2, "Edit");

//  Fetching/Parsing RSS Data

let parser = new DOMParser();

async function getData(url) {
    console.log("Trying...");
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error("Could Not Retrieve Data");
    }
    let feedText = await data.text();
    let xmlDoc = parser.parseFromString(feedText, "text/xml");
    console.log("Got Feed!" + url);
    return xmlDoc;
}

// Creating article objects from feed

const articleArray = [];

function Article(link, title, desc, pubDate, folder, feedName){
    this.link = link;
    this.title = title;
    this.desc = desc;
    this.pubDate = pubDate;
    this.folder = folder;
    this.feedName = feedName;
}

function createArticleObj(xmlDoc, folder, name) {
    let itemList = xmlDoc.getElementsByTagName('item');
    for (let i = 0; i < itemList.length; i++) {
        let node = itemList[i];
        let link = node.getElementsByTagName('link')[0].textContent;
        let title = node.getElementsByTagName('title')[0].textContent;
        let desc = node.getElementsByTagName('description')[0].textContent;
        let pubDate = node.getElementsByTagName('pubDate')[0].textContent;
        let feedName = name;
        const articleObj = new Article(link, title, desc, pubDate, folder, feedName);
        articleArray.push(articleObj);
    }
}



// Construct Content Cards

const cardArray = [];


function cardConstruct(obj) {

        let linkWrapper = document.createElement('a');
        let parentFolder = document.getElementById('textDiv');
        parentFolder.appendChild(linkWrapper);    

        if (obj.link !== undefined){
            const itemLink = obj.link;
            linkWrapper.href = itemLink;
            }
    
        let newCard = document.createElement('div');
        linkWrapper.appendChild(newCard);
        newCard.className = "contentCard";
    
        let newButton = document.createElement('button');
        newButton.className = "cardButton";
        newButton.innerHTML = "<i class='fa-solid fa-bars'></i>"
        newCard.appendChild(newButton);
    
        let itemTitle = obj.title;
        let newTitle = document.createElement('h3');
        newCard.appendChild(newTitle);
        newTitle.innerHTML = itemTitle;
    
        let itemDesc = obj.desc;
        let newDesc = document.createElement('p');
        newCard.appendChild(newDesc);
        newDesc.innerHTML = itemDesc;
    
        let itemDate = obj.pubDate;
        let newDate = document.createElement('p');
        newCard.appendChild(newDate);
        newDate.innerHTML = itemDate;

        let x = itemDate.replace(/\w{3}, /,'');
        timestamp = Date.parse(x);
        newCard.id = obj.feedName + timestamp;
}
// Card Sorting and Display

let xmlMaster;
const serializer = new XMLSerializer();

function masterConstruct(feedText) {
    if (xmlMaster === undefined) {
        masterString = '<?xml version="1.0" encoding="utf-8"?><masterroot>' + feedText + "</masterroot>"
        xmlMaster = new DOMParser().parseFromString(masterString, "text/xml");
    }
    else {
        masterString = serializer.serializeToString(xmlMaster);
        masterString = masterString.replace(/<\/masterroot>$/, '');
        masterString += feedText;
        masterString += "</masterroot>";
        xmlMaster = new DOMParser().parseFromString(masterString, "text/xml");
    }

    const dateList = xmlMaster.getElementsByTagName('pubDate');
    for (let i = 0; i < dateList.length; i++) {
        let pubDate = dateList[i].textContent;
        if (cardArray.indexOf(pubDate) === -1){cardArray.push(pubDate)};
    }
}

function getAllFeeds (array) {
    for (let i =0 ; i < array.length; i++) {
        let url = array[i].url;
        let folder = array[i].folder;
        let name = array[i].name;
        getData(url)
            .then((xmlDoc) => createArticleObj(xmlDoc, folder, name))
        }
}

getAllFeeds(rssList);

// Joshua's getAllFeeds

// function getAllFeeds(array) {
//     const promises = array.map(url => getData(url).then(xml => cardConstruct(xml)));
//     return Promise.all(promises);
// }
