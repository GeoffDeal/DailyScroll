// Get current date and time

const unformatedDate = Date();
const date =  unformatedDate.toLocaleString();
document.getElementById('timestamp').innerHTML = date;


// Collapsible buttons

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var contentFeed = this.nextElementSibling;
        var contentFeedStyle = window.getComputedStyle(contentFeed);
        if (contentFeedStyle.display === "block" || contentFeedStyle.display === "") {
            contentFeed.style.display = "none";
        }   else{
                contentFeed.style.display = "block";
            }
        
        this.parentNode.classList.toggle("active");
    });
};

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