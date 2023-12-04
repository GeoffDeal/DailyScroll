const date = Date();
console.log(date);
document.getElementById('timestamp').innerHTML = date;

fetch('https://smbc-rss-plus.mindflakes.com/rss.xml')
    .then(response => {
        if (!response.ok) {
            throw new Error ("Problem fetching feed!");
        }
    })
    // .then(xmlData => {
    //     const parser = new DOMParser();
    //     const 
    // })