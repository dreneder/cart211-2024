"use strict";

const txtReader = new p5.Speech(); // speech object
let inputText = `Write something, and I will read it for you. I mean. Maybe...`; // default text
let wordCount; // variable to store the word count
let canSpeak = true; // flag to check if text can be spoken
let readCount = 0; // variable to count how many times text has been read
let lastReadTime = 0; // stores the time of the last reading
let randomReactions = [
    "Gee, are you going to be typing all day?", // random reaction 1
    "Yon don't expect me to keep reading, do you?", // random reaction 2
    "I can't believe you're still going!", // random reaction 3
    "Dude, just use word.", // random reaction 4
    "You must have a lot to say!" // random reaction 5
];

// pulls the input by id from the text box
document.getElementById("textReadBox").addEventListener("input", function () {
    inputText = this.value; // updates the input text when typed
    console.log(inputText); // logs the input text
});

let speakButton; // variable for the speak button

function setup() {
    // speakButton = createButton('Speak'); // creating the speak button
    // speakButton.mousePressed(doSpeak); // triggers speak on button press

    txtReader.speak(`Write something, and I will read it for you. I mean. Maybe...`); // initial speech when the page loads
}

function keyReleased() {
    if (keyCode === 32) { // 32 is the keycode for spacebar
        const words = inputText.trim().split(/\s+/); // splits the text into words by spaces
        wordCount = words.length; // stores the word count

        const currentTime = millis(); // gets the current time
        const timeSinceLastRead = currentTime - lastReadTime; // calculates the time passed since last read

        if (wordCount >= 4) { // only proceed if there are 4 or more words
            // reads every 2 words after the first 4
            if (wordCount % 2 === 0) {
                const lastTwoWords = words.slice(-2).join(' '); // gets the last two words
                console.log(`Last two words: ${lastTwoWords}`); // logs the last two words
                if (canSpeak) {
                    txtReader.speak(lastTwoWords); // speaks the last two words
                    readCount++; // increments the read count
                    lastReadTime = currentTime; // updates the last read time
                }
            }

            // if too many words are typed within 5 seconds, say "blah blah blah"
            if (timeSinceLastRead < 5000) {
                if (wordCount > 20) { // threshold of 20 words
                    txtReader.speak("Blah blah blah..."); // speaks "blah blah blah"
                    readCount++; // increments the read count
                    lastReadTime = currentTime; // updates the last read time
                }
            }

            // trigger random reactions every 5 to 8 reads
            if (readCount >= 5 && readCount <= 8) {
                const randomReaction = randomReactions[Math.floor(Math.random() * randomReactions.length)]; // selects a random reaction
                txtReader.speak(randomReaction); // speaks the random reaction
                readCount = 0; // resets the read count after the reaction
            }
        }
    }
}

function doSpeak() {
    txtReader.speak(inputText); // reads the entire input when the Speak button is clicked
}
