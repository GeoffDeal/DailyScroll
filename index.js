// Get current date and time

const unformatedDate = Date();
const date =  unformatedDate.toLocaleString();
document.getElementById('timestamp').innerHTML = date;



// Collapsible sidebar

function openSidebar() {
    var sidebar = document.getElementsByClassName("sidebar");

    if (sidebar.style.display ==="block"||sidebar.style.display ===""){
        sidebar.style.display = "none";
    }   else{
            sidebar.style.display = "block";
    }
}


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