function setup() {
  createCanvas(400, 500);
  colorMode(HSB, 100);
}

function draw() {
   fill(map(mouseX, 0, width, 0, 100), 100, 100);
  rect(width/2, height/2, 50, 50);
}