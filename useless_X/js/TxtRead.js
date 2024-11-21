"use strict";

const txtReader = new p5.Speech(); // speech object
let inputText = `Write something, and I will read it for you. I mean. Maybe...`;
let wordCount;
let canSpeak = true;
let readCount = 0;
let lastReadTime = 0;
let randomReactions = [
    "Gee, are you going to be typing all day?",
    "Yon don't expect me to keep reading, do you?",
    "I can't believe you're still going!",
    "Dude, just use word.",
    "You must have a lot to say!"
];

// Pulls the input by id from the text box
document.getElementById("textReadBox").addEventListener("input", function () {
    inputText = this.value; // Updates the variable
    console.log(inputText);
});

let speakButton;

function setup() {
    // speakButton = createButton('Speak');
    // speakButton.mousePressed(doSpeak);

    txtReader.speak(`Write something, and I will read it for you. I mean. Maybe...`);
}

function keyReleased() {
    if (keyCode === 32) { // 32 is the keycode for spacebar
        const words = inputText.trim().split(/\s+/); // Split the text into words
        wordCount = words.length;

        const currentTime = millis();
        const timeSinceLastRead = currentTime - lastReadTime;

        if (wordCount >= 4) {
            // Read every 2 words after the first 4
            if (wordCount % 2 === 0) {
                const lastTwoWords = words.slice(-2).join(' ');
                console.log(`Last two words: ${lastTwoWords}`);
                if (canSpeak) {
                    txtReader.speak(lastTwoWords);
                    readCount++;
                    lastReadTime = currentTime;
                }
            }

            // If too many words are typed within 5 seconds, say "blah blah blah"
            if (timeSinceLastRead < 5000) {
                if (wordCount > 20) { // You can adjust this threshold
                    txtReader.speak("Blah blah blah...");
                    readCount++;
                    lastReadTime = currentTime;
                }
            }

            // Trigger random reactions every 5 to 8 reads
            if (readCount >= 5 && readCount <= 8) {
                const randomReaction = randomReactions[Math.floor(Math.random() * randomReactions.length)];
                txtReader.speak(randomReaction);
                readCount = 0; // Reset readCount after a random reaction
            }
        }
    }
}

function doSpeak() {
    txtReader.speak(inputText); // Reads the entire input when the Speak button is clicked
}
