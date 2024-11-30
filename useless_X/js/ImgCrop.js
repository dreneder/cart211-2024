"use strict";

let shrek;
let loadedImg; // stores the loaded image
let croppedImg; // stores the cropped image
let randomColor; // random color value
let maxWidth; // maximum width for the image
let maxHeight; // maximum height for the image

// crop boundaries
let cropLeft = 0;
let cropRight = 0;
let cropUp = 0;
let cropDown = 0;

let imgX;
let imgY;
let imgWidth;
let imgHeight;

let imgLeft;
let imgRight;
let imgUp;
let imgDown;

// knob objects
let knobLeft;
let knobRight;
let knobUp;
let knobDown;

function preload() {
    shrek = loadImage(`assets/images/shrek.jpg`); // preload the image
}

function setup() {
    createCanvas(646, 700);
    importRandomColor();
    loadedImg = shrek;
    maxSize();

    imgX = 0;
    imgY = 0;
    imgWidth = maxWidth;
    imgHeight = maxHeight;

    // initialize knob controls
    knobLeft = new Knob(width / 6, 540, 60);
    knobRight = new Knob((width / 6) * 5, 540, 60);
    knobUp = new Knob((width / 6) * 2.35, 540, 60);
    knobDown = new Knob((width / 6) * 3.65, 540, 60);

    // setup HTML elements for file upload and save
    const uploadButton = select("#uploadButton");
    const fileInput = select("#fileInput");
    const saveButton = select("#saveButton");

    uploadButton.mousePressed(() => fileInput.elt.click());
    fileInput.changed(handleFile);
    saveButton.mousePressed(saveCroppedImage);
}

function draw() {
    background(255);

    // calculate cropping boundaries
    imgLeft = constrain(imgX, 0, imgWidth) + constrain(round(knobLeft.getValue()), 0, imgWidth);
    imgRight = constrain(imgWidth, 0, imgWidth) - constrain(round(knobRight.getValue()), 0, imgWidth);
    imgUp = constrain(imgY, 0, imgHeight) + constrain(round(knobUp.getValue()), 0, imgHeight);
    imgDown = constrain(imgHeight, 0, imgHeight) - constrain(round(knobDown.getValue()), 0, imgHeight);

    cropLeft = map(imgLeft, 0, maxWidth, 0, loadedImg.width);
    cropRight = map(imgRight, 0, maxWidth, 0, loadedImg.width);
    cropUp = map(imgUp, 0, maxHeight, 0, loadedImg.height);
    cropDown = map(imgDown, 0, maxHeight, 0, loadedImg.height);

    stroke(112);
    strokeWeight(5);
    noFill();

    // draw knobs
    knobLeft.update();
    knobLeft.draw();

    knobRight.update();
    knobRight.draw();

    knobUp.update();
    knobUp.draw();

    knobDown.update();
    knobDown.draw();

    // crop the image based on knob values
    croppedImg = loadedImg.get(cropLeft, cropUp, cropRight, cropDown);
    image(croppedImg, imgLeft + 3, imgUp + 5, imgRight, imgDown);
}

function importRandomColor() {
    let hexColor = expRandomColor;
    randomColor = color(hexColor); // convert hex to color
}

function maxSize() {
    let imgWidth = 640; // max allowed width
    let imgHeight = 480; // max allowed height

    let aspectRatio = loadedImg.width / loadedImg.height;
    maxWidth = loadedImg.width;
    maxHeight = loadedImg.height;

    // adjust dimensions to maintain aspect ratio
    if (maxWidth > imgWidth) {
        maxWidth = imgWidth;
        maxHeight = imgWidth / aspectRatio;
    }

    if (maxHeight > imgHeight) {
        maxHeight = imgHeight;
        maxWidth = imgHeight * aspectRatio;
    }
}

function retainValues() {
    round(knobLeft.getValue());
    round(knobRight.getValue());
    round(knobUp.getValue());
    round(knobDown.getValue());
}

function mousePressed() {
    // handle knob interaction
    knobLeft.pressed();
    knobRight.pressed();
    knobUp.pressed();
    knobDown.pressed();
}

function mouseReleased() {
    knobLeft.released();
    knobRight.released();
    knobUp.released();
    knobDown.released();
}

function handleFile() {
    const file = this.elt.files[0];
    if (file && file.type.startsWith("image/")) {
        const imgUrl = URL.createObjectURL(file);
        loadedImg = loadImage(imgUrl, () => {
            maxSize(); // adjust image dimensions
        });
    } else {
        console.log("Please upload a valid image.");
    }
}

function saveCroppedImage() {
    save(croppedImg, 'croppedImage.png'); // save the cropped image
}