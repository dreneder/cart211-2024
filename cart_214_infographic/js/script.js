let numSides = 8; // number of sides for the octagon
let baseRadius = 200; // base radius of the octagon
let targetRadii = []; // target radii for each section
let currentRadii = []; // current radii for smooth transition
let interactionRadius;
let padding = 10; // expand interaction zone slightly for better detection
let images = []; // array to hold images
let yinYang;
let textLabels = [
  ["7020", "Sa Peg Ma (Horse Stance)", "A stance with feet wide, used for stability and defense."],
  ["3549", "Pao Choy (Uppercut)", "An upward strike aimed at the chin or under the chin, often used to counter."],
  ["3892", "Tune Kwan (Stick)", "A long weapon used for striking and blocking, emphasizing reach and control."],
  ["5967", "Tai Chong Qe (Front Kick)", "A direct, powerful kick aimed at the opponent's midsection or head."],
  ["6132", "Oh Jeen Ma (Front Stance)", "A forward stance that allows for powerful, aggressive movements."],
  ["5742", "Yat Choy (Straight punch)", "A quick, straight punch designed to keep the opponent at a distance."],
  ["1140", "Dan Do (Broadsword)", "A sword used for slicing and chopping with both hands, offering control and power."],
  ["5265", "Gung Fu Toy (Roundhouse Kick)", "A high, powerful kick aimed to strike from the side, often targeting the head."],
]; // kung fu categories with amounts and explanations

let textAlphas = []; // alpha transparency for each label
let imageScales = []; // scale factors for images
let pulseScales = []; // additional pulse scale factor for animation

function preload() {
  for (let i = 0; i < numSides; i++) {
    images[i] = loadImage(`assets/images/icons-${i}.png`); // replace with real image URLs
  }
  yinYang = loadImage(`assets/images/YinYang.png`); // yin yang image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  interactionRadius = baseRadius;

  let disparities = [1.6, 1.16, 1.2, 1.45, 1.55, 1.4, 0.8, 1.35];
  for (let i = 0; i < numSides; i++) {
    let radius = baseRadius * disparities[i];
    targetRadii[i] = radius;
    currentRadii[i] = radius;
    textAlphas[i] = 0;
    imageScales[i] = 1;
    pulseScales[i] = 1;
  }
}

function draw() {
  background(30);
  fill(255, 0, 0, 40);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(400);
  text("萬", width / 5, height / 2);
  text("萬", width / 5 * 4, height / 2);
  fill(255);
  textSize(30);
  textFont('Tahoma');
  text("MY JOURNEY TO", width / 2, 40);
  textSize(100);
  text("10000", width / 2, 100);
  textSize(15);
  text(
    "10,000 is the number of repetitions that forge mastery, for through relentless practice, movement transcends effort, becoming instinct and a reflection of the mind’s harmony with the body.",
    width / 2 - 250, height - 120, 500
  );
  translate(width / 2, height / 2);

  let angleStep = TWO_PI / numSides;

  for (let i = 0; i < numSides; i++) {
    let angle1 = -PI / 8 + i * angleStep;
    let angle2 = -PI / 8 + (i + 1) * angleStep;

    let interactX1 = cos(angle1) * (interactionRadius + padding);
    let interactY1 = sin(angle1) * (interactionRadius + padding);
    let interactX2 = cos(angle2) * (interactionRadius + padding);
    let interactY2 = sin(angle2) * (interactionRadius + padding);

    if (collidePointTriangle(mouseX - width / 2, mouseY - height / 2, 0, 0, interactX1, interactY1, interactX2, interactY2)) {
      targetRadii[i] = baseRadius * 2;
      textAlphas[i] = lerp(textAlphas[i], 255, 0.1);
      imageScales[i] = lerp(imageScales[i], 3, 0.05);
      pulseScales[i] = lerp(pulseScales[i], 1.1, 0.05);
    } else {
      targetRadii[i] = baseRadius * [1, 1.5, 0.8, 1.2, 1.4, 0.9, 1.3, 1.1][i];
      textAlphas[i] = lerp(textAlphas[i], 0, 0.1);
      imageScales[i] = lerp(imageScales[i], 1.5, 0.1);
      pulseScales[i] = lerp(pulseScales[i], 1, 0.1);
    }

    currentRadii[i] = lerp(currentRadii[i], targetRadii[i], 0.1);

    let displayX1 = cos(angle1) * currentRadii[i];
    let displayY1 = sin(angle1) * currentRadii[i];
    let displayX2 = cos(angle2) * currentRadii[i];
    let displayY2 = sin(angle2) * currentRadii[i];

    fill(0);
    stroke(255);
    strokeWeight(2);
    beginShape();
    vertex(0, 0);
    vertex(displayX1, displayY1);
    vertex(displayX2, displayY2);
    endShape(CLOSE);

    let centerX = (displayX1 + displayX2) / 2 / 1.5;
    let centerY = (displayY1 + displayY2) / 2 / 1.5;

    let imgSize = 50 * imageScales[i] * pulseScales[i];
    imageMode(CENTER);
    image(images[i], centerX, centerY, imgSize, imgSize);

    fill(255, textAlphas[i]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(40);

    let textX = i < 2 || i > 5 ? width * 0.85 : width * 0.15;
    let textY = height / 2;

    text(`${textLabels[i][0]}`, textX - width / 2, textY - height / 2);
    textSize(18);
    text(textLabels[i][1], textX - width / 2, textY - height / 2 + 30);

    textSize(14);
    let maxWidth = 150;
    let wrappedText = wrapText(textLabels[i][2], maxWidth);
    text(wrappedText, textX - width / 2, textY - height / 2 + 80);
  }

  image(yinYang, 0, 0, 100, 100);
}

function wrapText(text, maxWidth) {
  let words = text.split(' ');
  let currentLine = '';
  let wrappedText = '';

  for (let i = 0; i < words.length; i++) {
    let testLine = currentLine + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth && i > 0) {
      wrappedText += currentLine + '\n';
      currentLine = words[i] + ' ';
    } else {
      currentLine = testLine;
    }
  }

  wrappedText += currentLine;
  return wrappedText;
}
