"use strict";

let rickroll;
let video;

let volumeSelect;

let tiltBox = {
    x: 0,
    y: 0,
    width: 260,
    height: 50
};

let tiltAngle = 0; // current rotation angle
let isDragging = false; // whether the box is being dragged
let lastAngle = 0; // stores last recorded angle during dragging

let tiltTranslation = {
    x: 320,
    y: 630
};

let volElps = {
    x: -100, // horizontal position of the volume indicator
    y: 0
};

let ballGravity = 0; // gravity effect on the volume control

function preload() {
    // preload assets if necessary
}

function setup() {
    createCanvas(640, 770);
    rickroll = createVideo([
        'assets/videos/Rick_Astley_Never_Gonna_Give_You_Up.mp4',
        'assets/videos/Rick_Astley_Never_Gonna_Give_You_Up.webm'
    ]);
    rickroll.play(); // start video
    rickroll.loop(); // loop video
    rickroll.hide(); // hide video controls
    volControl(); // initialize volume control
}

function draw() {
    background(255);
    video = rickroll.get(); // get current video frame
    image(video, 0, 0); // display video frame
    
    // smooth rotation back to 0 when not dragging
    if (!isDragging) {
        tiltAngle = lerp(tiltAngle, 0, 0.1);
    }

    // set translation for tiltBox and draw it
    translate(tiltTranslation.x, tiltTranslation.y);
    fill(200);
    stroke(150);
    strokeWeight(2);
    rectMode(CENTER);
    rotate(radians(tiltAngle)); // apply rotation
    rect(tiltBox.x, tiltBox.y, tiltBox.width, tiltBox.height, 20); // draw the rectangle

    // draw volume bar and ball
    fill(120);
    noStroke();
    rect(0, 0, 200, 5, 3); // center bar
    fill(220);
    stroke(120);
    ellipseMode(CENTER);
    volElps.x = constrain(volElps.x, -100, 100); // constrain ball movement
    ellipse(volElps.x, volElps.y, 20); // draw the ball

    if (isDragging) {
        // update ball position based on tilt angle
        ballGravity = map(tiltAngle, -90, 90, -3, 3);
        volElps.x += ballGravity;
    }
    
    volControl(); // update volume
}

function volControl() {
    // map ball position to volume level
    rickroll.volume(map(volElps.x, -100, 100, 0, 1, true));
}

function mousePressed() {
    // check if mouse is inside the rectangle
    let localX = mouseX - tiltTranslation.x;
    let localY = mouseY - tiltTranslation.y;
    if (abs(localX) <= tiltBox.width / 2 && abs(localY) <= tiltBox.height / 2) {
        isDragging = true;
        lastAngle = atan2(localY, localX); // record initial drag angle
    }
}

function mouseDragged() {
    // update rotation angle while dragging
    if (isDragging) {
        let currentAngle = atan2(mouseY - tiltTranslation.y, mouseX - tiltTranslation.x);
        
        // avoid large jumps in angle (crossing the 180-degree boundary)
        let angleChange = degrees(currentAngle - lastAngle);
        if (angleChange > 180) {
            angleChange -= 360;
        } else if (angleChange < -180) {
            angleChange += 360;
        }
        
        tiltAngle += angleChange; // adjust tilt angle
        lastAngle = currentAngle; // update last angle
    }
}

function mouseReleased() {
    // stop dragging and reset rotation angle
    isDragging = false;
}