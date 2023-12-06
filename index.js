// Get current date and time
const date = Date();
console.log(date);
document.getElementById('timestamp').innerHTML = date;


// Collapsilbe buttons

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var contentFeed = this.nextElementSibling;
        var contentFeedStyle = window.getComputedStyle(contentFeed);
        if (contentFeedStyle.style.display === "block" || contentFeedStyle.display === "") {
            contentFeed.style.display = "none";
        }
            else{
                contentFeed.style.display = "block";
            }
    });
};