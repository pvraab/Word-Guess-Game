$(document).ready(function () {

    console.log("Start");

    // Define game object so it can be passed by reference to functions
    var game = {
        wins: 0,
        losses: 0,
        guesses: 10,
        guessedLetters: [],
        guessedLettersHit: [],
        guessedLettersMiss: [],
        currentGuess: "",
        wordIndex: 0,
        currentWord: "",
        countDown: 0,
        currentChars: [],
        currentWordSpaces: [],
        currentTheme: "swordPlay",
        swordWords: ["rapier", "parry", "thrust"],
        climbingWords: ["rope", "belay", "piton"],
        fossilWords: ["trilobite", "cast", "mold"]
    }

    // Draw gallows
    drawGallows();
    console.log("draw gallows");

    // Get initial computer word
    getWord();

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
        console.log("game.guessedLetters.length " + game.guessedLetters.length);

        // Is it a valid letter
        // Make sure it is lowercase
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // Check if character already used
            for (var i = 0; i < game.guessedLetters.length; i++) {
                if (event.key === game.guessedLetters[i]) {
                    console.log("Return 1 " + event.key);
                    return;
                }
            }

            // Not a character
        } else {
            console.log("Return 2");
            return;
        }

        // Push this character onto guessed array
        game.currentGuess = event.key.toLowerCase();
        game.guessedLetters.push(game.currentGuess);

        console.log("User key press " + game.currentGuess);

        // Look for a match in already guessed successfully chars
        for (var i = 0; i < game.guessedLettersHit.length; i++) {
            if (game.currentGuess === game.guessedLettersHit[i]) {
                return;
            }
        }

        // Look for a match in word
        var hitIt = false;
        var hitOne = false;

        // Cycle through all of the characters
        for (var i = 0; i < game.currentChars.length; i++) {

            // Found a match - is first match
            if (game.currentGuess === game.currentChars[i] && !hitIt) {
                game.guessedLettersHit.push(game.currentGuess);
                hitIt = true;
                hitOne = true;
                game.countDown--;
                console.log("Got a match " + game.currentGuess);

                // Put good guess on screen
                var wordObj = document.getElementById("word_spaces");
                // var icnt = 0;
                console.log(game.currentWordSpaces + " " + game.currentWordSpaces.length);
                var inString = wordObj.textContent;
                console.log("In String " + inString);
                console.log("1st sub " + inString.substring(0, i));
                console.log("2nd sub " + inString.substring(i + 1));
                var newString = inString.substring(0, i) + game.currentGuess + inString.substring(i + 1);
                wordObj.textContent = newString;
                // for (var j = 0; j < game.currentWordSpaces.length; j++) {
                //     if (icnt === i) {
                //         wordObj.textContent = wordObj.textContent + game.currentGuess;
                //     } else {
                //         wordObj.textContent = wordObj.textContent + "_";
                //     }
                //     icnt++;
                // }

                // Found a match is second or ... match
            } else if (game.currentGuess === game.currentChars[i] && hitIt) {
                hitOne = true;
                wordObj.text = game.currentGuess;
                game.countDown--;

                console.log("Got another match on same key " + game.currentGuess);
                var wordObj = document.getElementById("word_spaces");
                var inString = wordObj.textContent;
                var newString = inString.substring(0, i) + game.currentGuess + inString.substring(i + 1);
                wordObj.textContent = newString;

            }

        }

        // A wrong letter picked
        if (!hitOne) {
            game.guesses--;
            console.log("Missed " + game.guesses);
            var bodyPart = 10 - game.guesses;
            console.log("Body part " + bodyPart);
            drawBody(bodyPart);
        }

        // Put up all the guesses
        $("#guessesSoFar").append(" " + game.currentGuess);

        // Check for a loss
        if (game.guesses <= 0) {
            alert("You lost - word was " + game.currentWord);
            game.losses++;

            clearCanvas();

            // Draw gallows
            drawGallows();

            // Reset everyone
            game.guesses = 10;
            document.getElementById("guessesLeft").innerHTML = game.guesses;
            document.getElementById("losses").innerHTML = game.losses;
            $("#guessesSoFar").text("");
            getWord();
        }


        // Check for a win
        if (game.countDown === 0) {
            game.wins++;

            // Reset everyone
            game.guesses = 10;
            game.guessedLetters = [];
            game.currentChars = [];
            game.guessedLettersHit = [];

            clearCanvas();

            // Draw gallows
            drawGallows();

            document.getElementById("guessesLeft").innerHTML = game.guesses;
            document.getElementById("wins").innerHTML = game.wins;
            alert("You won!! - word is " + game.currentWord);
            $("#guessesSoFar").text("");
            getWord();

        }

    };

    // Get word
    function getWord() {
        game.wordIndex = Math.floor(Math.random() * game.swordWords.length);
        game.currentWord = game.swordWords[game.wordIndex];
        setUpWord();

        console.log("CompWord " + game.currentWord);

        // Break word down into characters
        for (var i = 0; i < game.currentWord.length; i++) {
            game.currentChars[i] = game.currentWord.charAt(i);
        }
        // game.currentChars = game.currentWord.slice();
        console.log("CompChars " + game.currentChars);
        game.countDown = game.currentWord.length;

    }

    // Setup display for new word
    function setUpWord() {
        console.log("In current word " + game.currentWord);
        var wordObj = document.getElementById("word");
        console.log(wordObj);
        wordObj.textContent = game.currentWord;
        console.log("In current word " + game.currentWord);

        console.log("In current word " + game.currentWord);
        var wordObj = document.getElementById("word_spaces");
        console.log(wordObj);
        var word_spaces = "";
        game.currentWordSpaces = [];
        for (var i = 0; i < game.currentWord.length; i++) {
            word_spaces = word_spaces + "_";
            game.currentWordSpaces.push("_");
        }
        wordObj.textContent = word_spaces;

    }

});


// When the user clicks on the dropdown button, 
// Toggle between hiding and showing the dropdown content 

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
    console.log("Style  " + themeList.options[themeList.selectedIndex].text);
    // myElement.style.background-image = "./assets/images/";
    // myElement.classList.remove("gameManager");
    // document.getElementById("gameManager").style.color = "blue";

    if (themeList.options[themeList.selectedIndex].text === "SwordPlay") {
        document.getElementById("gameManager").style.fontFamily = "Gothic";
        document.getElementById("gameManager").style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg')";
        document.getElementById("gameAction").style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg')";
        document.getElementById("gameHeader").style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg')";

        // Read swordPlay word file
        themeFileRead("swordPlay");
        // loadFile();

        // Put movie into div
        var x = document.createElement("VIDEO");

        if (x.canPlayType("video/mp4")) {
            x.setAttribute("src", "ThreeMusketeers.mp4");
        }
        x.setAttribute("width", "320");
        x.setAttribute("height", "240");
        x.setAttribute("controls", "controls");
        document.getElementById("gameMovie").appendChild(x);

    } else if (themeList.options[themeList.selectedIndex].text === "Climbing") {
        document.getElementById("gameManager").style.fontFamily = "Arial";
        document.getElementById("gameManager").style.backgroundImage = "url('./assets/images/Tetons20040014.jpg')";
        document.getElementById("gameAction").style.backgroundImage = "url('./assets/images/Tetons20040014.jpg')";
        document.getElementById("gameHeader").style.backgroundImage = "url('./assets/images/Tetons20040014.jpg')";
    } else if (themeList.options[themeList.selectedIndex].text === "Fossils") {
        document.getElementById("gameManager").style.fontFamily = "Courier";
        document.getElementById("gameManager").style.backgroundImage = "url('./assets/images/ricepaper_v3.jpg')";
        document.getElementById("gameAction").style.backgroundImage = "url('./assets/images/ricepaper_v3.jpg')";
        document.getElementById("gameHeader").style.backgroundImage = "url('./assets/images/ricepaper_v3.jpg')";
    }
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
    console.log(input.files[0]);
    reader.onload = function () {
        var text = reader.result;
        console.log(reader.result.substring(0, 200));
        alert("Got the file.n" +
            "name: " + input.files[0].name + "n" +
            "type: " + input.files[0].type + "n" +
            "size: " + input.files[0].size + " bytesn");
    };
    reader.readAsText(input.files[0]);
    console.log(reader);
    console.log(input.files[0]);

};


// File read for different themes
function themeFileRead(theme) {
    if (theme === "swordPlay") {
        console.log("In sword play");

    } else if (theme === "climbing") {

    } else if (theme === "fossils") {

    }

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        //do your stuff!
    } else {
        alert('The File APIs are not fully supported by your browser.');
    }

    // Create a file object
    var f = new File(["themeFileSwordPlay"], "./themeFileSwordPlay.txt", {
        type: "text/plain"
    });
    console.log(f);

    // Create a FileReader object
    var reader = new FileReader();
    console.log(reader);
    console.log(f);

    reader.onload = function () {
        console.log("Inside onload");
        var text = reader.result;
        console.log(reader.result.substring(0, 200));
        alert("Got the file.n" +
            "name: " + f.name + "n" +
            "type: " + f.type + "n" +
            "size: " + f.size + " bytesn");
    };
    reader.readAsText(f);
    console.log(reader);
    console.log(f);
}

// Draw gallows
function drawGallows() {

    //  Get graphics context
    var canvas = document.getElementById("canvasDrawing");
    var ctx = canvas.getContext("2d");

    // Build a gallows
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 10, 200);
    ctx.fillRect(0, 0, 100, 5);
    ctx.fillRect(100, 0, 10, 20);
}

// Draw a body
function drawBody(bodyPart) {

    //  Get graphics context
    var canvas = document.getElementById("canvasDrawing");
    var ctx = canvas.getContext("2d");

    //  Put a head on it
    if (bodyPart === 1 || bodyPart === 0) {
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(105, 30, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    //  Put a body on it
    if (bodyPart === 2 || bodyPart === 0) {
        ctx.moveTo(105, 40);
        ctx.lineTo(105, 75);
        ctx.stroke();
    }

    //  Put a left arm on it
    if (bodyPart === 3 || bodyPart === 0) {
        ctx.moveTo(105, 45);
        ctx.lineTo(120, 55);
        ctx.stroke();
    }

    //  Put a right arm on it
    if (bodyPart === 4 || bodyPart === 0) {
        ctx.moveTo(105, 45);
        ctx.lineTo(90, 55);
        ctx.stroke();
    }

    //  Put a left leg on it
    if (bodyPart === 5 || bodyPart === 0) {
        ctx.moveTo(105, 75);
        ctx.lineTo(120, 95);
        ctx.stroke();
    }

    //  Put a right leg on it
    if (bodyPart === 6 || bodyPart === 0) {
        ctx.moveTo(105, 75);
        ctx.lineTo(90, 95);
        ctx.stroke();
    }

    //  Put a left hand on it
    if (bodyPart === 7 || bodyPart === 0) {
        ctx.moveTo(120, 55);
        ctx.lineTo(125, 45);
        ctx.stroke();
    }

    //  Put a right hand on it
    if (bodyPart === 8 || bodyPart === 0) {
        ctx.moveTo(90, 55);
        ctx.lineTo(85, 45);
        ctx.stroke();
    }

    //  Put a left foot on it
    if (bodyPart === 9 || bodyPart === 0) {
        ctx.moveTo(120, 95);
        ctx.lineTo(130, 95);
        ctx.stroke();
    }

    //  Put a right foot on it
    if (bodyPart === 10 || bodyPart === 0) {
        ctx.moveTo(90, 95);
        ctx.lineTo(80, 95);
        ctx.stroke();
    }

}

function clearCanvas() {

    //  Get graphics context
    var canvas = document.getElementById("canvasDrawing");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}


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