console.log("Test");
// Collapsible sidebar

function sideBar() {
    document.getElementById("sidebar").classList.toggle("menuDisplay");
}

document.getElementById("sidebarButton").onclick = sideBar;

//Popup Forms

function openForm (x) {
    document.getElementById(x).style.display = "block";
};

function closeForm (x) {
    document.getElementById(x).style.display = "none";
};

// Creating new folders

function createFolder(){
    let folderName = document.getElementById('nfolder').value;

    let newFolder = document.createElement('div');
    newFolder.className = 'contentFeed';
    newFolder.id = folderName;

    document.getElementById('contentFolder').appendChild(newFolder);

    let newTab = document.createElement('button');
    newTab.className = 'folderTab';
    newTab.innerHTML = folderName;

    document.getElementById('folderTabs').appendChild(newTab);

}