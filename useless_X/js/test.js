let img;
let croppedImg;

let cropTest = 1200;

function preload() {
  // Load your image
  img = loadImage(`assets/images/shrek_2.jpg`); // Replace with your image path
}

function setup() {
  createCanvas(1200, 675);


}

function draw() {
  background(200);

  let cropX = 0;  // X-coordinate of top-left corner
  let cropY = 0;  // Y-coordinate of top-left corner
  let cropW = 1200; // Width of the crop area
  let cropH = 675; // Height of the crop area

  // Crop the image
  croppedImg = img.get(cropX, cropY, cropW, cropH);
    // imageMode(CENTER);
  // Display the original image
//   image(img, width/2, height/2, 400, 200);

  // Display the cropped image
  if (croppedImg) {
    image(croppedImg, 0, 0,cropTest,675); // Position the cropped image
  }
}

function keyPressed () {
    if (keyCode === LEFT_ARROW) {
        cropTest++; 
    }
}