var video;
var vScale = 30;
var r = 0;
var g = 0;
var b = 0;
var rotation = 0;


function setup() {
  createCanvas(1500, 800);
  videoSetup();
}

function draw() {
  background(100)
  drawButtons();
  angleMode(DEGREES)
  rectMode(CENTER);
  displayVideo();
}

function displayVideo() {
  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x -1 + (y * video.width))*4;
      r = video.pixels[index+0];
      g = video.pixels[index+1];
      b = video.pixels[index+2];

      // choose rotation for square pixels
      if (mouseX > 1100 && mouseX < 1100 + 30 && mouseY > 85 && mouseY < 115) {
      rotation += 0.005
      }
      if (mouseX > 1150 && mouseX < 1180 && mouseY > 85 && mouseY < 115) {
      rotation += .2
      }
      if (mouseX > 1200 && mouseX < 1230 && mouseY > 85 && mouseY < 115) {
      rotation += 5
      }

      // choose rotation for ellipse pixels
      if (mouseX > 1100 && mouseX < 1130 && mouseY > 185 && mouseY < 215) {
        rotation += .01
      }
      if (mouseX > 1150 && mouseX < 1180 && mouseY > 185 && mouseY < 215) {
        rotation += .2
      }
      if (mouseX > 1200 && mouseX < 1230 && mouseY > 185 && mouseY < 215) {
        rotation += 5
      }

      colorMode(RGB)
      fill(r, g, b)
      push();
      translate(x*vScale, y*vScale);
      rotate(rotation);
      noStroke();

      // choose the draw ellipse pixels
      if (mouseX > 1100 && mouseX < 1100 + 30 && mouseY > 185 && mouseY < 215) {
        ellipse(0, 0, vScale+10, vScale/1.5+7);
      }
      if (mouseX > 1150 && mouseX < 1180 && mouseY > 185 && mouseY < 215) {
        ellipse(0, 0, vScale+10, vScale/1.5+7);
      }
      if (mouseX > 1200 && mouseX < 1230 && mouseY > 185 && mouseY < 215) {
        ellipse(0, 0, vScale+10, vScale/1.5+7)
      }

      // choose to draw square pixels
      if (mouseX > 1100 && mouseX < 1100 + 30 && mouseY > 85 && mouseY < 115) {
      rect(0, 0, vScale, vScale)
      }
      if (mouseX > 1150 && mouseX < 1180 && mouseY > 85 && mouseY < 115) {
      rect(0, 0, vScale, vScale)
      }
      if (mouseX > 1200 && mouseX < 1230 && mouseY > 85 && mouseY < 115) {
      rect(0, 0, vScale, vScale)
      }
      pop();
    }
  }
}

function videoSetup() {
  rectMode(CENTER);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(1000/vScale, 800/vScale);
}

function drawButtons() {
rectMode(CORNER);
fill(255)

// directions
textSize(25)
text("Hover over a box to change pixel type", 1000, 25)
text("and speed.", 1150, 50)
textSize(20)
text("sqaure pixels", 1240, 110)
text("ellipse pixels", 1240, 210)

  // square boxes
  fill(255, 0, 0)
  rect(1100, 85, 30, 30)
  fill(242, 255, 0)
  rect(1150, 85, 30, 30)
  fill(0, 255, 0)
  rect(1200, 85, 30, 30)

  // ellipse boxes
  fill(255, 0, 0)
  rect(1100, 185, 30, 30)
  fill(242, 255, 0)
  rect(1150, 185, 30, 30)
  fill(0, 255, 0)
  rect(1200, 185, 30, 30)
}
