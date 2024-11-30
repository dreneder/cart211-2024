let img; // declare variable for the image
let croppedImg; // declare variable for the cropped image

let cropTest = 1200; // initial crop width value

// preload function to load the image before the setup
function preload() {
  img = loadImage(`assets/images/shrek_2.jpg`); // load the image from assets
}

function setup() {
  createCanvas(1200, 675); // create a canvas with width 1200 and height 675
}

function draw() {
  background(200); // set the background color to light gray

  let cropX = 0;  // x-coordinate of top-left corner for cropping
  let cropY = 0;  // y-coordinate of top-left corner for cropping
  let cropW = 1200; // width of the cropping area
  let cropH = 675; // height of the cropping area

  // crop the image based on the specified coordinates and dimensions
  croppedImg = img.get(cropX, cropY, cropW, cropH);

  // display the cropped image on the canvas
  if (croppedImg) {
    image(croppedImg, 0, 0, cropTest, 675); // position the cropped image at (0, 0)
  }
}

// key pressed function to increase the crop width
function keyPressed() {
    if (keyCode === LEFT_ARROW) { // if left arrow key is pressed
        cropTest++; // increase the crop width value by 1
    }
}