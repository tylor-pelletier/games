"use strict";

// Create variables
var simonInput = [],
    playerInput = [],
    id,
    level = 0,
    buttonSounds = [
    "",
    "button-sound1.wav",
    "button-sound2.wav",
    "button-sound3.wav",
    "button-sound4.wav",
];

// Get everything ready once the page loads
$(document).ready(function() {
    // Add click functionality to start the game
    $("#start").click(function() {
        $("#start").hide();
        // Increase the level after every successful entry
        level += 1;
        // Call the start game function
        startGame();
    });

    // Add player functionality with clicks
    $(".square").click(function() {
        // Clear the wrong answer alert
        $("#top-box").text("");
        // Grab the id number from the square clicked by the player
        id = $(this).attr("id");
        // Push the number to the playerInput array
        playerInput.push(id);
        // Add the color change and sound when a block is selected
        addColorAndSound(id);
        // Show the number that was picked by player
        console.log(id);

        // Check to see if the player's input was correct
        // If the player was incorrect:
        if (!isPlayerCorrect()) {
            // Alert them that they were wrong
            $("#top-box").append("<h1 id='end-game'>Wrong input<br>You made it to level: " + level + "<br>Better luck next time!</h1>");
            // alert("Wrong input, you made it to level: " + level + "\nBetter luck next time!");
            // Reset game
            playerInput = [];
            simonInput = [];
            level = 0;
            // Show the start button
            $("#start").show();
        }

        // If the player was correct:
        else if (playerInput.length === simonInput.length && isPlayerCorrect()) {
            // Go to the next level
            level += 1;
            // Reset player's input
            playerInput = [];
            // Have Simon play the next round
            startGame();
        }
    })
});

// Check if the player's input was the same as Simon's input
function isPlayerCorrect() {
    // Runs through the player's array and Simon's array to see if each input matches
    for (var i = 0; i < playerInput.length; i += 1) {
        if (playerInput[i] != simonInput[i]) {
            return false;
        }
    }
    return true;
}

// Simon's input
function startGame() {
    // Clear the wrong answer alert
    $("#top-box").text("");
    // Add the level to the display
    $(".level").text(level);
    // Get the random color number
    randomColor();
    // Set i to 0 to check for the newest input added to Simon's array
    var i = 0;
    // Create the random sequence
    var myInterval = setInterval(function() {
        // Put Simon's newest input in the id variable
        id = simonInput[i];
        // Show the number that was picked by Simon
        console.log(id);
        // Add the color change and sound when a block is selected
        addColorAndSound(id);
        // Increment i
        i += 1;
        // If i equals the length of Simon's inputs, stop interval
        if (i === simonInput.length) {
            i = 0;
            clearInterval(myInterval)
        }
        // Simon will pick colors every second
    }, 1000);

}

// Simon's random color generator
function randomColor() {
    // Generates number from 1 to 4. Each number is equal to a color
    // 1 = red  2 = blue  3 = green  4 = yellow
    var randomColorPicked = Math.floor(Math.random() * 4) + 1;
    // Push that number to Simon's input array
    simonInput.push(randomColorPicked);
}

// Add color change and sound
function addColorAndSound(id) {
    // Changes the opacity to solid for the specific square chosen
    $("#" + id).css("opacity", 1);
    // Plays the sound connected to the specific square chosen
    playSound(id);
    // Sets a time for how long the opacity will show
    setTimeout(function() {
        // Sets the opacity back to half
        $("#" + id).css("opacity", 0.5)
        // The feature will last 2 milliseconds
    }, 200);
}

// Add function for sound to play for each square
function playSound(id) {
    // Grabs the sound for the specific square chosen
    var sound = new Audio(buttonSounds[id]);
    // Plays the sound
    sound.play()
}