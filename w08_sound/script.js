// Initialize Audio Context and Oscillator
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
let enablePlay = false;
let enableStop = false;

// Set initial oscillator properties
function setOsc() {
oscillator.type = 'sine'; // Options: 'sine', 'square', 'sawtooth', 'triangle'
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Default frequency (A4)
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Default volume
}

// Play Sound Button
document.getElementById("playSound").addEventListener("click", () => {
    oscillator.start();
    // oscillator.loop = true;
    enablePlay = true;
    setOsc();
});

// Stop Sound Button
document.getElementById("stopSound").addEventListener("click", () => {
    oscillator.stop();
    enableStop = true;
    
});

if (enablePlay) {
    document.getElementById("playSound").disabled = true; // Disable play button after starting
    document.getElementById("stopSound").disabled = false; // Enables stop button after starting
}

if (enableStop) {
    document.getElementById("playSound").disabled = true; // Disable play button after starting
    document.getElementById("stopSound").disabled = false; // Enables stop button after starting
    
}

// Volume Control Slider
document.getElementById("volumeControl").addEventListener("input", (event) => {
    gainNode.gain.setValueAtTime(event.target.value, audioContext.currentTime);
});

// Frequency Control (Pitch) Slider
document.getElementById("frequencyControl").addEventListener("input", (event) => {
    oscillator.frequency.setValueAtTime(event.target.value, audioContext.currentTime);
});

// Reset Button to restore default settings
function resetSettings() {
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Reset volume
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Reset frequency
    document.getElementById("volumeControl").value = 0.5;
    document.getElementById("frequencyControl").value = 440;
}


document.getElementById("resetButton").addEventListener("click", resetSettings);


console.log(document.getElementById("simple").value);