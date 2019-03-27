/* 
 * When the user clicks on the dropdown button, 
 * toggle between hiding and showing the dropdown content 
 */
function themeFunction() {
    document.getElementById("themeDropdown").classList.toggle("show");
    console.log("Here 1");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    console.log("Here 2");

    if (!event.target.matches('.dropbtn')) {
        console.log("Here 3");

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            console.log("Here 4");
            var openDropdown = dropdowns[i];
            console.log(openDropdown);
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// File read for different themes
function themeFileRead(theme) {
    if (theme === "swordPlay") {

    } else if (theme === "climbing") {

    } else if (theme === "fossils") {

    }

    // Require a Node.js library called fs.js
    const fs = require('fs')

    // Read file
    fs.readFile('themeFileSwordPlay.txt', (err, data) => {
        if (err) throw err;

        console.log(data.toString());
    })

}