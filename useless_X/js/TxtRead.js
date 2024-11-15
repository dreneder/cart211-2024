
"use strict";

const txtReader = new p5.Speech(); // speech object

let inputText = `Write something, and I will read it for you. I mean. Maybe...`;

let wordCount;

let canSpeak = true;

// pulls the input by id from the text box
document.getElementById("textReadBox").addEventListener("input", function() {
    inputText = this.value; // updates the variable
    console.log(inputText);
    
    update();
});

let menuLoaded = 0;

let speakbutton;

function setup()
{
	
// 		// // checkbox:
// 		// // checkbox = createInput(0, 1, 0);
// 		// // checkbox.attribute("type", "checkbox");
// 		// // checkbox.style("width", "15px");
// 		// // checkbox.style("height", "15px");
//   		// // checkbox.position(100, 100);
		
	speakbutton = createButton('Speak');
  	// speakbutton.position(0, 100);
  	speakbutton.mousePressed(doSpeak);


      txtReader.speak(`Write something, and I will read it for you. I mean. Maybe...`);



	}

// function update() {
//     // checks if the word count is a multiple of 4
//     wordCount = inputText.trim().split(/\s+/).length;

//     if (wordCount % 4 === 0 && wordCount > 0) {
//         if (canSpeak) {
//             console.log('multiple reached');
//             txtReader.interrupt;
            
//             txtReader.speak(inputText);
            
//         }
//         if (txtReader.onEnd) {
//             canSpeak = true
//             console.log('on end');
//         }
//     }

//     console.log(canSpeak);
// }

function keyReleased() {
    if (key === 32) {
        if (wordCount % 4 === 0 && wordCount > 0) {
            if (canSpeak) {
                console.log('multiple reached');
                txtReader.interrupt;
                
                txtReader.speak(inputText);
                
            }
    }
}
}

// 	function setVolume()
// 	{
// 		myVoice.setVolume(vslider.value()/100.);
// 	}
// 	function setRate()
// 	{
// 		myVoice.setRate(rslider.value()/100.);
// 	}
// 	function setPitch()
// 	{
// 		myVoice.setPitch(pslider.value()/100.);
// 	}


	function doSpeak()
	{
		
		txtReader.speak(inputText); // debug printer for voice options
	}
