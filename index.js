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
    var folderName = document.getElementById('nfolder').value;

    var newFolder = document.createElement('div');
    newFolder.className = 'contentFolder';
    newFolder.id = folderName;

    document.getElementById('folderHolder').appendChild(newFolder);

}