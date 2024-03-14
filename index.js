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
            createFolder(folderName);
        } else {
            closeForm('folderForm');
        }
    
     } else {
        console.log("Local storage not supported")
     }
}

function createFolder(name) {
    if (folderList.indexOf(name) === -1) {
        folderList.push(name);
        let folderString = JSON.stringify(folderList);
        localStorage.setItem("storedFolders",folderString);
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
    appendBreak(radioContainer)
}

// Edit Feed

document.getElementById('editRemoveButton').addEventListener("click", function() {openForm('editFeedForm')});
document.getElementById('editFeedButton').addEventListener("click", editFeed);
document.getElementById('cancelEditButton').addEventListener("click", function() {closeForm('editFeedForm')});


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

// Radio Check

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
            throw "Please select an option";
        }
        else {
            return selectedRadio;
        }
    }
    catch(err) {
        alert(err);
    }
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

// Edit/Delete Folder

document.getElementById('editRemoveFolderButton').addEventListener('click', function () {openForm('removeFolderForm')});
document.getElementById('editRemoveFolderCancel').addEventListener('click', function () {closeForm('removeFolderForm')});
document.getElementById('removeFolderButton').addEventListener('click', deleteFolder);
document.getElementById('editFolderButton').addEventListener('click', editFolder);
document.getElementById('editFolderConfirmButton').addEventListener('click', editFolderConfirm);
document.getElementById('cancelEditFolderButton').addEventListener('click', function () {closeForm('folderChangesForm')});

function deleteFolder() {
    let folderChoice = radioCheck("folderChoiceRemove");
    let folderIndex = folderList.indexOf(folderChoice);
    folderList.splice(folderIndex, 1);
    let folderString = JSON.stringify(folderList);
    localStorage.setItem("storedFolders",folderString);
    closeForm('removeFolderForm');
    location.reload();
}
let folderChoiceIndex;
function editFolder() {
    closeForm('removeFolderForm');
    let folderChoice = radioCheck("folderChoiceRemove");
    folderChoiceIndex = folderList.indexOf(folderChoice);
    openForm('folderChangesForm');
    document.getElementById('folderPositionChange').setAttribute('max', folderList.length );
    document.getElementById('folderChangeHeader').innerHTML = 'Editing ' + folderList[folderChoiceIndex];
    document.getElementById('folderNameChange').value = folderList[folderChoiceIndex];
    document.getElementById('folderPositionChange').value = folderChoiceIndex + 1;
}
function editFolderConfirm() {
    folderList[folderChoiceIndex] = document.getElementById('folderNameChange').value;
    let changingFolder = folderList[folderChoiceIndex];
    folderList.splice(folderChoiceIndex, 1);
    folderList.splice(document.getElementById('folderPositionChange').value - 1, 0, changingFolder);
    closeForm('folderChangesForm');
    let folderString = JSON.stringify(folderList);
    localStorage.setItem("storedFolders",folderString);
    // location.reload();
    console.log(folderList);
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
// Creating folders

for ( i=0; i < folderList.length; i++) {
    let newTab = document.createElement('button');
    newTab.className = 'folderTab';
    newTab.id = folderList[i];
    newTab.innerHTML = folderList[i];
    document.getElementById('folderTabs').appendChild(newTab);
}


// Switch tab active

function activeTab(tab) {
    let tabList = document.getElementsByClassName("folderTab");
    for (let i = 0; i < tabList.length; i++) {
        tabList[i].classList.remove("active");
    }
    document.getElementById(tab).classList.add("active");
}

// Tab Switching Display Function

function tabDisplay(whichTab) {

    let chosenTab = document.getElementById(whichTab);
    if (chosenTab.classList.contains("active") !== true) {
        
        const contentFolder = document.getElementById('contentFolder');
        while (contentFolder.firstChild){
            contentFolder.removeChild(contentFolder.firstChild);
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

document.getElementById("All").addEventListener("click", allTabDisplay);

function allTabDisplay() {

    let chosenTab = document.getElementById('All');
    if (chosenTab.classList.contains("active") !== true){
        const contentFolder = document.getElementById('contentFolder');
        while (contentFolder.firstChild){
            contentFolder.removeChild(contentFolder.firstChild);
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
        displayTen('All');
    }
}

// Display content function

let n = 0;

function displayTen (folderTab) {
    let count = 0
    displayContent(count, folderTab);
}
function displayContent (count, folderTab) {
    if (document.getElementById('faveButton').classList.contains('selected')){
        selectedArray = faveArray;
    }
    else {
        selectedArray = articleArray;
    }
    let feedLength = selectedArray.length;
    if (n < feedLength && count < 10) {
        if (folderTab === 'All'){
            cardConstruct(selectedArray[n]);
            count++;
        }
        else {
            if(selectedArray[n].folder === folderTab) {
                cardConstruct(selectedArray[n]);
                count++;
            }
        }
        n++;
        displayContent(count, folderTab);
}
}

// Load more on scroll

window.addEventListener('scroll', loadMore);
function tabChoice() {
    const tabList = document.getElementsByClassName('folderTab');
    for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].classList.contains('active')) {
            return tabList[i].id;
        }
}}

function loadMore() {

    if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 10) {
        let selectedTab = tabChoice();
        displayTen(selectedTab);
    }
}

// Scroll to top button

window.addEventListener('scroll', buttonAppears);

function buttonAppears() {
    if (document.documentElement.scrollTop >= 3000) {
        document.getElementById('scrollTop').style.display = "block";
    }
    else {
        document.getElementById('scrollTop').style.display = "none";
    }
}

document.getElementById('scrollTop').addEventListener('click', scrollTop);

function scrollTop() {
    window.scrollTo(0, 0);
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
folderListCreate("removeFolderRadios", 3, "Remove");

// Card Forms

function createCardForm(cardId) {
    
    affectedCard = document.getElementById(cardId);
    let menuForm = document.createElement('div');
    menuForm.className = "cardMenu";
    menuForm.id = cardId + "Menu";
    affectedCard.appendChild(menuForm);

    if (document.getElementById('faveButton').classList.contains('selected')) {
        let newFaveButton = document.createElement('button');
        newFaveButton.innerHTML = "Remove from Favourites";
        newFaveButton.addEventListener('click', function () {
            removeFave(cardId);
            cancelForm(menuForm.id);;
        });
        menuForm.appendChild(newFaveButton);
        appendBreak(menuForm);
    } else {
        let newFaveButton = document.createElement('button');
        newFaveButton.innerHTML = "Add to Favourites";
        newFaveButton.addEventListener('click', function () {
            saveFave(cardId);
            cancelForm(menuForm.id);
        });
        menuForm.appendChild(newFaveButton);
        appendBreak(menuForm);
    }

    let newHideButton = document.createElement('button');
    newHideButton.innerHTML = "Hide Article";
    // newHideButton.addEventListener('click', );
    menuForm.appendChild(newHideButton);
    appendBreak(menuForm);

    let newCancelButton = document.createElement('button');
    newCancelButton.innerHTML = "Cancel";
    newCancelButton.addEventListener('click', function() {
        cancelForm(menuForm.id);
    });
    menuForm.appendChild(newCancelButton);
}

// Destroy form function

function cancelForm(formId) {
    let form = document.getElementById(formId);
    while (form.firstChild){
        form.removeChild(form.firstChild);
    }
    form.remove();
}

// Append Break function

function appendBreak(parent) {
    let br = document.createElement('br');
    parent.appendChild(br);
}

// Fave toggle

document.getElementById('faveButton').addEventListener('click', faveFunction);
function faveFunction() {
    document.getElementById('faveButton').classList.toggle('selected');
    document.getElementById('All').classList.remove('active');
    allTabDisplay();
}

// Saved Favourites

let faveArray = JSON.parse(localStorage.getItem("storedFaves"));

if (faveArray === null) {
    faveArray = [];
}

function saveFave(articleId) {

    let articleObj;
    for (let i = 0; i < articleArray.length; i++) {
        if (articleArray[i].cardId === articleId) {
            articleObj = articleArray[i];
        }
    }
    if (articleObj !== undefined) {
        faveArray.push(articleObj);
        let faveString = JSON.stringify(faveArray);
        localStorage.setItem("storedFaves", faveString);
    }
}
function removeFave(articleId) {
    for (let i = 0; i < faveArray.length; i++) {
        if (articleId === faveArray[i].cardId) {
            faveArray.splice(i, 1);
            let faveString = JSON.stringify(faveArray);
            localStorage.setItem("storedFaves", faveString);
        }
    }
}

//  Fetching/Parsing RSS Data

let parser = new DOMParser();

async function getData(url) {
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

function Article(link, title, desc, pubDate, folder, feedName, cardId){
    this.link = link;
    this.title = title;
    this.desc = desc;
    this.pubDate = pubDate;
    this.folder = folder;
    this.feedName = feedName;
    this.cardId = cardId;
}

function createArticleObj(xmlDoc, folder, name) {
    if (xmlDoc.getElementsByTagName('rss')) {
        let itemList = xmlDoc.getElementsByTagName('item');
        for (let i = 0; i < itemList.length; i++) {
            let node = itemList[i];
            let link = node.getElementsByTagName('link')[0].textContent;
            let title = node.getElementsByTagName('title')[0].textContent;
            let desc = node.getElementsByTagName('description')[0].textContent;
            let pubDate = node.getElementsByTagName('pubDate')[0].textContent;
            let feedName = name;
            let x = pubDate.replace(/\w{3}, /,'');
            timestamp = Date.parse(x);
            let cardId = name + timestamp;
            const articleObj = new Article(link, title, desc, pubDate, folder, feedName, cardId);
            articleArray.push(articleObj);
        }
    }
    if (xmlDoc.getElementsByTagName('?xml')) {
        let itemList = xmlDoc.getElementsByTagName('entry');
        for (let i = 0; i < itemList.length; i++) {
            let node = itemList[i];
            let link = node.getElementsByTagName('link')[0].getAttribute('href');
            let title = node.getElementsByTagName('title')[0].textContent;
            let desc;
            if (node.getElementsByTagName('content').length > 0) {
                desc = node.getElementsByTagName('content')[0].textContent;
            }if (node.getElementsByTagName('summary').length > 0){
                desc = node.getElementsByTagName('summary')[0].textContent;
            }
            let pubDate = node.getElementsByTagName('updated')[0].textContent;
            let feedName = name;
            // let x = pubDate.replace(/\w{3}, /,'');summary
            timestamp = Date.parse(pubDate);
            let cardId = name + timestamp;
            const articleObj = new Article(link, title, desc, pubDate, folder, feedName, cardId);
            articleArray.push(articleObj);
        }
    }
}



// Construct Content Cards

const cardArray = [];

function cardConstruct(obj) {

    let parentFolder = document.getElementById('contentFolder');

    let newCard = document.createElement('div');
    parentFolder.appendChild(newCard);
    newCard.className = "contentCard";
    newCard.id = obj.cardId;
    
    let newButton = document.createElement('button');
    newButton.className = "cardButton";
    newButton.innerHTML = "<i class='fa-solid fa-bars'></i>"
    newCard.appendChild(newButton);
    newButton.addEventListener('click', function(){
            createCardForm(obj.cardId);
        })

    let linkWrapper = document.createElement('a');
    if (obj.link !== undefined){
        const itemLink = obj.link;
        linkWrapper.href = itemLink;
    }
    newCard.appendChild(linkWrapper);
    let itemTitle = obj.title + ' - ' +obj.feedName;
    let newTitle = document.createElement('h3');
    linkWrapper.appendChild(newTitle);
    newTitle.innerHTML = itemTitle;
    
    let itemDesc = obj.desc;
    let newDesc = document.createElement('p');
    newCard.appendChild(newDesc);
    newDesc.innerHTML = itemDesc;
    
    let itemDate = obj.pubDate;
    let newDate = document.createElement('p');
    newCard.appendChild(newDate);
    newDate.innerHTML = itemDate;
}

// Card Sorting and Display

let xmlMaster;
const serializer = new XMLSerializer();

function masterConstruct(feedText) { //Check this
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
        let timestamp = Date.now();
        let url = 'https://corsproxy.io/?' + array[i].url + '?timestamp=' + timestamp;
        let folder = array[i].folder;
        let name = array[i].name;
        getData(url)
            .then((xmlDoc) => createArticleObj(xmlDoc, folder, name))
        }
}

getAllFeeds(rssList);


// Weather Call
let weatherData;
let forecastData;

let weatherInfo = JSON.parse(localStorage.getItem("storedWeather"));
if (weatherInfo === null){
    weatherInfo = {};
 } else {
    fetchWeather('weather');
    fetchWeather('forecast');
    document.getElementById('Weather').addEventListener('click', displayWeather);
 }
function displayWeather() {
    // console.log(forecastData);
    if (document.getElementById('weatherDisplay')=== null){
        weatherCard();
        populateWeather(weatherData);
        generateForecast();
    }
}
function weatherCard() {
    let newCard = document.createElement('div');
    let parentDiv = document.getElementById('contentFolder');
    parentDiv.prepend(newCard);
    newCard.className = "contentCard";
    newCard.id = 'weatherDisplay';
    
    let weatherDiv = document.createElement('div');
    newCard.appendChild(weatherDiv);
    weatherDiv.id = 'weatherDiv';

}
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function populateWeather(dataObj) {
    if (dataObj.cod === 200) {
        let weatherMain = document.createElement('h3');
        let date = new Date();
        let weekday = weekdays[date.getDay()];
        weatherMain.innerHTML = weekday + ' | ' + dataObj.weather[0].main;
        parentDiv = document.getElementById('weatherDiv');
        parentDiv.appendChild(weatherMain);

        let weatherIcon = document.createElement('i');
        parentDiv.appendChild(weatherIcon);
        let iconCode = dataObj.weather[0].icon;
        let codeNum = iconCode.substring(0, iconCode.length - 1);
        switch (codeNum) {
            case '01':
                weatherIcon.className = "fa-regular fa-sun";
                break;
            case '02':
                weatherIcon.className = "fa-solid fa-cloud-sun";
                break;
            case '03':
                weatherIcon.className = "fa-solid fa-cloud-sun";
                break;
            case '04':
                weatherIcon.className = "fa-solid fa-cloud";
                break;
            case '09':
                weatherIcon.className = "fa-solid fa-cloud-rain";
                break;
            case '10':
                weatherIcon.className = "fa-solid fa-cloud-showers-heavy";
                break;
            case '11':
                weatherIcon.className = "fa-solid fa-cloud-bolt";
                break;
            case '13':
                weatherIcon.className = "fa-regular fa-snowflake";
                break;
            case '50':
                weatherIcon.className = "fa-solid fa-smog";
        }

        let weatherTemp = document.createElement('p');
        parentDiv.appendChild(weatherTemp);
        let temp = Math.round(dataObj.main.temp - 273.15);
        let tempText = 'Temp: ' + temp + '&deg;C';
        weatherTemp.innerHTML = tempText;

        let weatherWind = document.createElement('p');
        parentDiv.appendChild(weatherWind)
        let wind = Math.round(dataObj.wind.speed * 3.6);
        let windText = 'Wind: ' + wind + ' k/h';
        weatherWind.innerHTML = windText;

        let weatherDesc = document.createElement('p');
        parentDiv.appendChild(weatherDesc);
        let desc = dataObj.weather[0].description;
        weatherDesc.innerHTML = desc;
    }else {
        document.getElementById('weatherDiv').innerHTML = dataObj.message;
    }
}
async function fetchWeather(request) {
    let lat = weatherInfo.lat;
    let long = weatherInfo.long;
    let key = weatherInfo.key;
    let weatherType = request;
    let apiUrl = 'https://api.openweathermap.org/data/2.5/' + weatherType +'?lat=' + lat + '&lon=' + long + '&appid=' + key;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error('Failed to get weather: ' + errorData.message);
                })
            }
            return response.json();
        })
        .then(dataObj => {
            if (weatherType === 'weather') {
                weatherData = dataObj;
            } else {
                forecastData = dataObj;
            }
        })
        .catch(error => {
            // id = weatherCard + 'Desc';
            // document.getElementById(id).innerHTML = error
        })
}

// Forecast data handling


const forecastArrays = {
    forecast0: [],
    forecast1: [],
    forecast2: [],
    forecast3: [],
    forecast4: [],
    forecast5: [],
    forecast6: [],
}

function dayFilter(timestamp) {
    let dataDay = new Date(timestamp * 1000);
    return dataDay.getDay();
}

function daySorting(forecastObj) {
    let forecastArray = forecastObj.list;
    for (let i = 0; i < forecastArray.length; i++) {
        let timestamp = forecastArray[i].dt;
        let weekday = dayFilter(timestamp);
        let forecastArrayName = "forecast" + weekday;
        forecastArrays[forecastArrayName].push(forecastArray[i]);
    }
}

function populateForecast(dayArray) {
    let forecastDiv = document.createElement('div');
    document.getElementById('weatherDisplay').appendChild(forecastDiv);

    
    let forecastMain = document.createElement('h3');
    let date = new Date(dayArray[0].dt * 1000);
    let weekday = weekdays[date.getDay()];
    forecastMain.innerHTML = weekday.slice(0, 3);
    forecastDiv.appendChild(forecastMain);
    
    forecastDiv.id = 'forecastDiv' + weekday;
    forecastDiv.className = 'forecastBlock';

    let weatherIcon = document.createElement('i');
    forecastDiv.appendChild(weatherIcon);
    const iconArray = [];
    for (let i = 0; i < dayArray.length; i++){
        iconArray.push(dayArray[i].weather[0].icon);
    }
    let iconCode = findMode(iconArray);
    let codeNum = iconCode.substring(0, iconCode.length - 1);
    switch (codeNum) {
        case '01':
            weatherIcon.className = "fa-regular fa-sun";
            break;
        case '02':
            weatherIcon.className = "fa-solid fa-cloud-sun";
            break;
        case '03':
            weatherIcon.className = "fa-solid fa-cloud-sun";
            break;
        case '04':
            weatherIcon.className = "fa-solid fa-cloud";
            break;
        case '09':
            weatherIcon.className = "fa-solid fa-cloud-rain";
            break;
        case '10':
            weatherIcon.className = "fa-solid fa-cloud-showers-heavy";
            break;
        case '11':
            weatherIcon.className = "fa-solid fa-cloud-bolt";
            break;
        case '13':
            weatherIcon.className = "fa-regular fa-snowflake";
            break;
        case '50':
            weatherIcon.className = "fa-solid fa-smog";
    }

    const tempArray = [];
    for (let i = 0; i < dayArray.length; i++){
        tempArray.push(dayArray[i].main.temp);
    }
    let maxTempDisplay = document.createElement('p');
    forecastDiv.appendChild(maxTempDisplay);
    let maxTemp = Math.max(...tempArray);
    let maxRounded = Math.round(maxTemp - 273.15);
    let maxText = 'Max: ' + maxRounded + '&deg;C';
    maxTempDisplay.innerHTML = maxText;

    let minTempDisplay = document.createElement('p');
    forecastDiv.appendChild(minTempDisplay);
    let minTemp = Math.min(...tempArray);
    let minRounded = Math.round(minTemp - 273.15);
    let minText = 'Min: ' + minRounded + '&deg;C';
    minTempDisplay.innerHTML = minText;

}
function findMode(array) {
    let modeMap = {};
    let maxCount = 0;
    let modeElement;

    array.forEach(element => {
        modeMap[element] = (modeMap[element] || 0) + 1;
        if (modeMap[element] > maxCount) {
            maxCount = modeMap[element];
            modeElement = element;
        }
    });
    return modeElement;
}
function generateForecast() {
    daySorting(forecastData);
    currentDay = new Date();
    currentWeekday = currentDay.getDay();
    for (let i = 0; i < 5; i++) {
        let forecastDay = currentWeekday + 1 + i;
        if (forecastDay > 6) {
            forecastDay = forecastDay - 7;
        }
        let forecastArrayName = "forecast" + forecastDay;
        populateForecast(forecastArrays[forecastArrayName]);
    }
}

// Setup Weather Widget

document.getElementById('weatherFormButton').addEventListener("click", function() {openForm('weatherForm')});
document.getElementById('createWeatherButton').addEventListener("click", createWeather);
document.getElementById('cancelWeatherButton').addEventListener("click", function() {closeForm('weatherForm')});

async function createWeather(event) {

    event.preventDefault();
    const userCity = document.getElementById('cityInput').value;
    const encodedCity = encodeURIComponent(userCity);
    const userAPI = document.getElementById('apiInput').value;
    const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodedCity + '&limit=5&appid=' + userAPI;
    if (userAPI === null || userAPI === "") {
        alert("Please enter an API key");
    }
    else {
        closeForm('weatherForm');

        weatherInfo.key = userAPI;
        let weatherString = JSON.stringify(weatherInfo);
        localStorage.setItem("storedWeather", weatherString);
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error('Failed to fetch data: ' + errorData.message);
                    })
                }
                return response.json()})
            .then(dataObj => cityConfirmation(dataObj))
            .catch(error => {
                alert(error.message)
            })
    }
}
function cityConfirmation(apiResponse) {
    
    let cityForm = document.createElement('div');
    cityForm.id = 'cityForm';
    cityForm.className = 'popupForm';
    document.getElementById('sidebar').appendChild(cityForm);

    let text = document.createElement('p');
    text.innerHTML = 'Please confirm your location:';
    cityForm.appendChild(text);

    for (let i = 0; i < apiResponse.length; i++) {
        let cityRadio = document.createElement('input');
        cityRadio.type = "radio";
        cityRadio.name = "cityRadio";
        cityRadio.id = "radio" + apiResponse[i].name + Math.trunc(apiResponse[i].lat) + Math.trunc(apiResponse[i].lon);
        cityRadio.value = i;
        cityForm.appendChild(cityRadio);

        let cityLabel = document.createElement('label');
        cityLabel.setAttribute("for", cityRadio.id);
        cityLabel.innerHTML = apiResponse[i].name + ", " + apiResponse[i].state + ", " + apiResponse[i].country + ", lat:" + apiResponse[i].lat + ", long:" + apiResponse[i].lon;
        cityForm.appendChild(cityLabel)

        document.createElement('br');
        appendBreak(cityForm);
    }

    let confirmButton = document.createElement('button');
    confirmButton.id = 'cityConfirmButton';
    confirmButton.addEventListener('click', function() {
        saveCity(apiResponse);

    })
    confirmButton.innerHTML = 'Confirm';
    cityForm.appendChild(confirmButton);
    
    let cancelButton = document.createElement('button');
    cancelButton.id = 'cityCancelButton';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', function(){
        cancelForm('cityForm');
    })
    cityForm.appendChild(cancelButton);
    
}

function saveCity(apiResponse) {
    let j = radioCheck('cityRadio');
    if (apiResponse[j] !== undefined) {

        let lat = apiResponse[j].lat;
        let long = apiResponse[j].lon;

        console.log('test ');
        weatherInfo.lat = lat;
        weatherInfo.long = long;
        let weatherString = JSON.stringify(weatherInfo);
        localStorage.setItem("storedWeather", weatherString);
        createFolder('Weather');
        cancelForm('cityForm');
        location.reload();
    }
}



