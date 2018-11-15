var img;
var img2;
var songs = []
var isPlaying = false;
var whichSong = 0;

function setup() {
  createCanvas(500, 500);
  img = loadImage("prescott.jpg");
  img2 = loadImage("dave.png");
  songs[0] = loadSound("Loitering.m4a");
  songs[1] = loadSound("Tooloud.m4a");
  songs[2] = loadSound("Vertical.m4a");
}

function draw() {
  background(255);
  if (isPlaying == true) {
    var x = 290;
    var y = 120;
    image(img2, 0, 0);
    fill(255);
    stroke(255);
    triangle(x, y, x + 25, y + 25, x - 25, y + 25);
    ellipse(350, 100, 150, 100);
    fill(0);
    textSize(30);
    text(getphrase(), 290, 110);
  } else {
    image(img, 0, 0);
    fill(255);
    stroke(0);
    textSize(38);
    text("Click songs a Dave quote!", 10, 420); //smoke one
  }
}

function mouseClicked() {
  if (isPlaying === true) {
    isPlaying = false;
    songs[whichSong].stop();
    whichSong++;
    if (whichSong >= songs.length) {
      whichSong = 0;
    }
  } else {
    isPlaying = true;
    songs[whichSong].play();
  }
}

function getphrase() {
  if (whichSong == 0) {
    return "Loitering!";
  } else if (whichSong == 1) {
    return "Too loud!";
  } else if (whichSong == 2) {
    return "Vertical!";
  }
}