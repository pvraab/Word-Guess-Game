// JavaScript for Bootcamp Homework #3
// Paul Raab
// Raab Enterprises LLC
// 4/12/2019
// ## Harder Assignment - Building a Word Guess Game (Hangman)
$(document).ready(function () {

    // JavaScript version
    // document.onload = function() {

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
        currentTheme: "SwordPlay",
        swordWords: ["rapier", "parry", "thrust",
            "deflect", "edge", "fuller",
            "guard", "lunge", "buckler",
            "tip", "swashbuckler", "forte"
        ],
        climbingWords: ["rope", "belay", "piton",
            "anchor", "armbar", "bolt",
            "crack", "jam", "layback",
            "rappel", "pitch", "smear"
        ],
        fossilWords: ["trilobite", "cast", "mold",
            "dinosaur", "crinoid", "stromatolite",
            "brachipod", "fossil", "taxonomy",
            "algae", "coprolite", "darwin"
        ]
    }

    // Initialize game
    initGame();

    // Initialize function
    function initGame() {

        document.querySelector("#alertMessage").textContent = "";

        // Reset everyone
        game.guesses = 10;
        game.guessedLetters = [];
        game.currentChars = [];
        game.guessedLettersHit = [];

        // Draw gallows
        clearCanvas();
        drawGallows();

        // Update game stats
        document.getElementById("guessesLeft").innerHTML = game.guesses;
        document.getElementById("wins").innerHTML = game.wins;
        document.getElementById("losses").innerHTML = game.losses;
        $("#guessesSoFar").text("");

        // Reset clue object
        var wordObj = document.getElementById("word_test");
        wordObj.textContent = "Click for word!";


        // Get first word
        getWord();

    }

    // Get a word
    function getWord() {

        if (game.currentTheme === "SwordPlay") {
            game.wordIndex = Math.floor(Math.random() * game.swordWords.length);
            game.currentWord = game.swordWords[game.wordIndex];
        } else if (game.currentTheme === "Fossils") {
            game.wordIndex = Math.floor(Math.random() * game.fossilWords.length);
            game.currentWord = game.fossilWords[game.wordIndex];
        } else if (game.currentTheme === "Climbing") {
            game.wordIndex = Math.floor(Math.random() * game.climbingWords.length);
            game.currentWord = game.climbingWords[game.wordIndex];
        }

        // Set up display for word
        setUpWord();

        // Break word down into characters
        for (var i = 0; i < game.currentWord.length; i++) {
            game.currentChars[i] = game.currentWord.charAt(i);
        }


        game.countDown = game.currentWord.length;

    }

    // Setup display for new word
    function setUpWord() {

        var debugOn = false;
        if (debugOn) {
            var wordObj = document.getElementById("word_test");
            wordObj.textContent = game.currentWord;
        }

        // Display initial word as " _ _ _ ..."
        var wordObj = document.getElementById("word_spaces");
        var word_spaces = "";
        game.currentWordSpaces = [];
        for (var i = 0; i < game.currentWord.length; i++) {
            word_spaces = word_spaces + "_";
            game.currentWordSpaces.push("_");
        }
        wordObj.textContent = word_spaces;

    }

    // Function to handle onkeydown event
    document.onkeydown = function (event) {

        // Get objects by Id from HTML for the various game elements
        var winsText = document.getElementById("wins");
        var lossesText = document.getElementById("losses");
        var guessesLeft = document.getElementById("guessesLeft");
        var guessesSoFar = document.getElementById("guessesSoFar");

        // Set guessesLeft
        var guessesLeft = document.getElementById("guessesLeft");
        guessesLeft.innerHTML = game.guesses;

        // Get the user key press
        var userKeyCode = String.fromCharCode(event.keyCode);
        var userKeyPress = event.key;

        // Is it a valid letter
        // Make sure it is lowercase
        if (event.keyCode >= 65 && event.keyCode <= 90) {

            // Check if character already used
            if (game.guessedLetters.includes(event.key)) {
                return;
            };

            // Not a character
        } else {
            return;
        }

        // Push this character onto guessed array
        game.currentGuess = event.key.toLowerCase();
        game.guessedLetters.push(game.currentGuess);

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

                // Put good guess on screen
                var wordObj = document.getElementById("word_spaces");
                var inString = wordObj.textContent;
                var newString = inString.substring(0, i) + game.currentGuess + inString.substring(i + 1);
                wordObj.textContent = newString;

                // Found a match is second or ... match
            } else if (game.currentGuess === game.currentChars[i] && hitIt) {
                hitOne = true;
                wordObj.text = game.currentGuess;
                game.countDown--;

                // Put good guess on screen
                var wordObj = document.getElementById("word_spaces");
                var inString = wordObj.textContent;
                var newString = inString.substring(0, i) + game.currentGuess + inString.substring(i + 1);
                wordObj.textContent = newString;

            }

        }

        // A wrong letter picked - decremeent guesses and draw a body part
        if (!hitOne) {
            game.guesses--;
            var bodyPart = 10 - game.guesses;
            drawBody(bodyPart);
        }

        // Put up all the guesses so far
        $("#guessesSoFar").append(" " + game.currentGuess);

        // Check for a loss
        if (game.guesses <= 0) {
            game.losses++;

            // Put a loss message up - leave it up for 3 seconds
            document.querySelector("#alertMessage").textContent = "You lost - the word was " + game.currentWord;
            setTimeout(function () {
                initGame();
            }, 3000);
        }

        // Check for a win
        if (game.countDown === 0) {
            game.wins++;

            // Play an audio bite
            var gameAudio = document.getElementById("gameAudio");
            gameAudio.setAttribute("src", './assets/sounds/think.wav')
            gameAudio.play();

            // Put a win message up - leave it up for 3 seconds
            document.querySelector("#alertMessage").textContent = "You won - the word was " + game.currentWord;
            setTimeout(function () {
                initGame();
            }, 3000);


        }

    };

    // };

    // Theme changed - make all the requisite updates
    function themeChanged() {

        var themeList = document.getElementById("themeList");

        game.currentTheme = themeList.options[themeList.selectedIndex].text;

        if (themeList.options[themeList.selectedIndex].text === "SwordPlay") {
            document.getElementById("gameManager").style.backgroundImage = "url('./assets/images/swordPlay.jpg')";
            document.getElementById("gameAction").style.backgroundImage = "url('./assets/images/swordPlay.jpg')";
            loadMovie("SwordPlay");
            initGame();
        } else if (themeList.options[themeList.selectedIndex].text === "Climbing") {
            document.getElementById("gameManager").style.backgroundImage = "url('./assets/images/climbing.jpg')";
            document.getElementById("gameAction").style.backgroundImage = "url('./assets/images/climbing.jpg')";
            loadMovie("Climbing");
            initGame();
        } else if (themeList.options[themeList.selectedIndex].text === "Fossils") {
            document.getElementById("gameManager").style.backgroundImage = "url('./assets/images/fossils.jpg')";
            document.getElementById("gameAction").style.backgroundImage = "url('./assets/images/fossils.jpg')";
            loadMovie("Fossils");
            initGame();
        }
    }

    // Load movie
    function loadMovie(theme) {

        var video = document.getElementById('video');
        var source = document.createElement('source');
        if (theme === "SwordPlay") {
            video.setAttribute("src", './assets/movies/ThreeMusketeers.mp4');
        } else if (theme === "Climbing") {
            video.setAttribute("src", "./assets/movies/Honnold.mp4");
        } else if (theme === "Fossils") {
            video.setAttribute("src", "./assets/movies/Fantasia.mp4");
        }
        video.play();
        video.setAttribute("controls", "controls");
    }

    $(word_test).on("click", function () {
        var wordObj = document.getElementById("word_test");
        wordObj.textContent = game.currentWord;
    });

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {

        console.log("in onclick " + event.target);
        var x = document.getElementById("themeList").length;
        console.log("value " + x);


        if (event.target.matches('#themeList')) {
            game.fossils
            console.log("in matches " + event);

            themeChanged();
        }
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
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

});

function themeChanged() {}