"use strict";


let rickroll;
let video;

let tiltBox = {
    x: 0,
    y: 0,
    width: 260,
    height: 50
};

let tiltAngle = 0;
let isDragging = false;
let lastAngle = 0;

let tiltTranslation = {
    x: 320,
    y: 630
};

let volElps = {
    x: -100,
    y: 0
}

let ballGravity = 0;

function preload() {
}

function setup() {
    createCanvas(640,770);
    rickroll = createVideo(['assets/videos/Rick_Astley_Never_Gonna_Give_You_Up.mp4','assets/videos/Rick_Astley_Never_Gonna_Give_You_Up.webm']);
    // rickroll.showControls();
    rickroll.play();
    rickroll.loop();
    rickroll.hide();
    volControl();
}

function draw() {
    background(255);
    video = rickroll.get();
    image(video, 0, 0);
    
// smooth rotation back to 0 when not dragging
if (!isDragging) {
    tiltAngle = lerp(tiltAngle, 0, 0.1);
}

// set the translation and draw the rectangle
translate(tiltTranslation.x, tiltTranslation.y);
fill(200);
stroke(150);
strokeWeight(2);
rectMode(CENTER);
// angleMode(DEGREES);
rotate(radians(tiltAngle));
rect(tiltBox.x, tiltBox.y, tiltBox.width, tiltBox.height, 20);
fill(120);
noStroke();
rect(0, 0, 200, 5, 3);
fill(220);
stroke(120);
ellipseMode(CENTER);
volElps.x = constrain(volElps.x,-100,100)
ellipse(volElps.x, volElps.y, 20);

// console.log(lastAngle);
// console.log(atan2(mouseY - tiltTranslation.y,mouseX - tiltTranslation.x));

if (isDragging) {
    ballGravity = map(tiltAngle,-90,90,-3,3);
    volElps.x += ballGravity;
}
volControl();
console.log(volElps.x);
}

function volControl() {
    rickroll.volume(map(volElps.x,-100,100,0,1,true));
  }
  
function mousePressed() {
    // check if the mouse is inside the rectangle
    let localX = mouseX - tiltTranslation.x;
    let localY = mouseY - tiltTranslation.y;
    if (abs(localX) <= tiltBox.width / 2 && abs(localY) <= tiltBox.height / 2) {
        isDragging = true;
        lastAngle = atan2(localY, localX);
    }
}

function mouseDragged() {
    // update rotation angle while dragging
    if (isDragging) {
        let currentAngle = atan2(mouseY - tiltTranslation.y, mouseX - tiltTranslation.x);
        
        // avoids large jumps in angle (crossing the 180-degree boundary)
        let angleChange = degrees(currentAngle - lastAngle);
        if (angleChange > 180) {
            angleChange -= 360;
        } else if (angleChange < -180) {
            angleChange += 360;
        }
        
        tiltAngle += angleChange;
        lastAngle = currentAngle;
    }
}

function mouseReleased() {
    // stop dragging and reset rotation angle
    isDragging = false;
}