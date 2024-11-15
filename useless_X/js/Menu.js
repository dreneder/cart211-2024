/**
* Ok, this is my first attempt to revive my knowledge of P5 and make this
* using it. Wish me luck! I mean, if you got here was because something worked.
*/

// "use strict";


// let selector;
// let neutral;
// let option1;
// let option2;
// let option3;



// function preload() {
    
// }
// function setup() {
//     createCanvas(width/8*7, height/3*2);

// }
// function display() {

// }


const knob = document.querySelector('.knob');

function calculatorDegree(e) {
    const x1 = window.innerWidth / 2;
    const y1 = window.innerHeight / 2;
    const x2 = e.clietX;
    const y2 = e.clietY;

    const deltaX = x1 - x2;
    const deltaY = y1 - y2;

    const rad = Math.atan2(deltaY, deltaX);

    let deg = rad * (180 / Math.PI);

    return deg;
}

knob.addEventListener("mousedown", function () {
    knob.addEventListener("mousemove", rotate);
        function rotate(e) {
            const result = Math.floor(calculatorDegree(e) - 90);
            knob.style.transform = `rotate(${result}deg)`;
        }
        knob.addEventListener("mouseup", function () {
            knob.removeEventListener("mousemove",rotate);
        });
});
