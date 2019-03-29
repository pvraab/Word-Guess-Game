$(document).ready(function () {

    /* 
     * When the user clicks on the dropdown button, 
     * toggle between hiding and showing the dropdown content 
     */
    function themeFunction() {
        document.getElementById("themeDropdown").classList.toggle("show");
        console.log("Here 1");
    }

    function themeChanged() {
        console.log("In theme changed");
        var themeList = document.getElementById("themeList");
        console.log(themeList);
        document.getElementById("themeCurrent").value = themeList.options[themeList.selectedIndex].text;
        var myElement = document.querySelector("#gameManager");
        console.log("Style  " + myElement);
        // myElement.style.background-image = "./assets/images/";
        // myElement.classList.remove("gameManager");
        // document.getElementById("gameManager").style.color = "blue";
        document.getElementById("gameManager").style.fontFamily = "Gothic";
        document.getElementById("gameManager").style.backgroundImage = "url('./assets/images/Tetons20040014.jpg')";
        drawFunction();
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

    function OnChange(dropdown) {
        var myindex = dropdown.selectedIndex
        var SelValue = dropdown.options[myindex].value
        var baseURL = "Some value based on SelValue";
        top.location.href = baseURL;
        return true;
    }


    // This "document.ready" code isn't necessary in this example... but is useful to become familiar with.
    // "document.ready" makes sure that our JavaScript doesn't get run until the HTML document is finished loading.
    $(document).ready(function () {

        // Here we use jQuery to select the header with "click-me" as its ID.
        // Notice I have the #click-me, click, and then the function
        // So $("#id|.class|element").on("action", function(){});
        // And so whenever it is clicked...
        $("#click-me").on("click", function () {
            themeFileRead("swordPlay");
        });

    });

    // Choose file from FileChooser
    var openFile = function (event) {
        var input = event.target;

        var reader = new FileReader();
        console.log(reader);
        reader.onload = function () {
            var text = reader.result;
            console.log(reader.result.substring(0, 200));
        };
        reader.readAsText(input.files[0]);
    };


    // File read for different themes
    function themeFileRead(theme) {
        if (theme === "swordPlay") {
            console.log("In sword play");

        } else if (theme === "climbing") {

        } else if (theme === "fossils") {

        }

        // Create a file object
        var f = new File(["themeFileSwordPlay"], "themeFileSwordPlay.txt", {
            type: "text/plain"
        });
        console.log(f);

        // Create a FileReader object
        var reader = new FileReader();
        console.log(reader);

        reader.onload = function () {
            var text = reader.result;
            console.log(reader.result.substring(0, 200));
        };
        reader.readAsText(f);


        // reader.onload = function (evt) {
        // document.body.innerHTML = evt.target.result + "<br><a href=" + URL.createObjectURL(file) + " download=" + file.name + ">Download " + file.name + "</a><br>type: " + file.type + "<br>last modified: " + file.lastModifiedDate
        // }
        // reader.onload = function () {
        //     var text = reader.result; // display file contents
        //     console.log(text);
        // }

        // reader.readAsDataURL(f);
        // // reader.read.readAsText(f);
        // // reader.readAsArrayBuffer(f);
        // var words = reader.result;
        // console.log("Words ");
        // console.log(words);
        // var words = reader.result;
        // console.log("Words ");
        // console.log(words);
        // var words = reader.result;
        // console.log("Words ");
        // console.log(words);


        // reader.readAsText("themeFileSwordPlay.txt");

        // var names = read("themeFileSwordPlay.txt").split("\n");
        // for (var i = 0; i < names.length; ++i) {
        //     names[i] = names[i].trim();
        //     console.log(names[i]);
        // }

        // var reader = new FileReader();
        // reader.readAsText("themeFileSwordPlay.txt");
        // var text = reader.result;
        // console.log(text);
        // reader.onload = function (e) {
        //     var text = reader.result;
        // }

    }


    // Require a Node.js library called fs.js
    // const fs = require('fs')

    // Read file
    // fs.readFile('themeFileSwordPlay.txt', (err, data) => {
    // if (err) throw err;
    // 
    // console.log(data.toString());
    // })

    // Draw gallows
    function drawFunction() {
        console.log("draw function");
        var canvas = document.getElementById("canvasDrawing");

        //  Get graphics context
        var ctx = canvas.getContext("2d");

        //  Fill a rectangle
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);

        //  Draw a line
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();

        // Build a gallows
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 10, 200);
        ctx.fillRect(0, 0, 50, 10);
        ctx.fillRect(40, 10, 10, 10);
    }

    function drawBody() {

        //  Put a head on it
        ctx.beginPath();
        ctx.arc(45, 25, 10, 0, 2 * Math.PI);
        ctx.stroke();

        //  Put a body on it
        ctx.moveTo(45, 45);
        ctx.lineTo(45, 75);
        ctx.stroke();

        //  Put a left arm on it
        ctx.moveTo(45, 45);
        ctx.lineTo(55, 55);
        ctx.stroke();

        //  Put a right arm on it
        ctx.moveTo(45, 45);
        ctx.lineTo(55, 55);
        ctx.stroke();

    }

    // Define game object so it can be passed by reference to functions
    var game = {
        wins: 0,
        losses: 0,
        guesses: 9,
        ipos: 0,
        az: [],
        compGuess: ""
    }

    // Fill az array with a-z
    var icnt = 0;
    for (var i = 97; i <= 122; i++) {
        game.az.push(String.fromCharCode(i));
        icnt++;
    }
    console.log(game.az);

    // Get initial computer guess
    game.ipos = Math.floor(Math.random() * 26);
    game.compGuess = game.az[game.ipos];
    console.log("CompGuess " + game.compGuess);

    // Check math random number function
    var iMin = 10000;
    var iMax = -10000;
    icnt = 0;
    while (icnt < 1000) {
        icnt++;
        var ival = Math.floor(Math.random() * 26);
        iMin = Math.min(ival, iMin);
        iMax = Math.max(ival, iMax);
    }
    console.log(iMin + " " + iMax);

    // Function to handle onkeydown event
    document.onkeydown = function (event) {

        console.log("In key down");

        // Get objects by Id from HTML for the various game elements
        var winsText = document.getElementById("wins");
        var lossesText = document.getElementById("losses");
        var guessesLeft = document.getElementById("guessesLeft");
        var guessesSoFar = document.getElementById("guessesSoFar");

        // Get the user key press
        var userKeyCode = String.fromCharCode(event.keyCode);
        var userKeyPress = event.key;

        console.log(userKeyPress + " " + game.compGuess);

        if (userKeyPress === game.compGuess) {
            alert("You won!! - your guess = " + userKeyPress + " comp guess = " + game.compGuess)
            game.guesses = 9;
            game.wins++;
            document.getElementById("guessesLeft").innerHTML = game.guesses;
            document.getElementById("wins").innerHTML = game.wins;
            $("#guessesSoFar").text("");
            var i = Math.floor(Math.random() * 26);
            game.compGuess = game.az[i]
        } else if (game.guesses <= 1) {
            alert("You lost - your guess = " + userKeyPress + " comp guess = " + game.compGuess)
            game.guesses = 9;
            game.losses++;
            document.getElementById("guessesLeft").innerHTML = game.guesses;
            document.getElementById("losses").innerHTML = game.losses;
            $("#guessesSoFar").text("");
            var i = Math.floor(Math.random() * 26);
            game.compGuess = game.az[i];
        } else {
            game.guesses--;
            document.getElementById("guessesLeft").innerHTML = game.guesses;
            $("#guessesSoFar").append(" " + userKeyPress);
        }
    };

});