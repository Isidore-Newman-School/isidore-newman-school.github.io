var spaceship; var flyenemy;
var ssx = 455; var ssy = 665; var bx = 455 + 21; var by = 690; var speed = 7.5;
var time = 0; var nlives = 1; var score = 0; var stagen = 1;
var enemies = []; var enemiesA = [];

function setup() {
  createCanvas(910, 765);
  spaceship = loadImage("pictures/spaceship.png")
  flyenemy = loadImage("pictures/flyenemy.png")
  stages();
}

function draw() {
  background(0);

  shipBasics();
  enemyBasics();
  miscBasics();
}

// ALL ENEMY FUNCTIONS
function enemyBasics() {
  hitEnemy();
  drawEnemy();
  enemyMovements();
  changeStage();
}
function drawEnemy() {
  // draw fly enemies
  for (i = 0; i < enemies.length; i++) {
    if (time/60 >= 3) {
      enemies[i].display();
    }
  }
  // draw aliens
  for (i = 0; i < enemiesA.length; i++) {
    if (time/60 > 5) {
      enemiesA[i].display();
    }
  }
}
function hitEnemy() {
  // deletes enemy from array
  for (i = 0; i < enemies.length; i ++) {
    if (bx >= enemies[i].x && bx <= enemies[i].x + flyenemy.width/40 && by <= enemies[i].y + flyenemy.height/40 && enemies[i].eby >= enemies[i].y && by > enemies[i].y) {
      enemies.splice(i, 1)
      bx = ssx + 21;
      by = 690;
      score += 5;
    }
  }
  // moves enemy off screen while bullet is still on screen
  for (i = 0; i < enemies.length; i++) {
    if (bx >= enemies[i].x && bx <= enemies[i].x + flyenemy.width/40 && by <= enemies[i].y + flyenemy.height/40 && by > enemies[i].y) {
      enemies[i].x = -1000000;
      enemies[i].y = -1000000;
      bx = ssx + 21;
      by = 690;
      score += 5;
    }
  }
  // deletes enemies moved off screen after their bullet leaves the screen from the array
  for (i = 0; i < enemies.length; i++) {
    if (bx >= enemies[i].x && bx <= enemies[i].x + flyenemy.width/40 && by <= enemies[i].y + flyenemy.height/40 && by > enemies[i].y && enemies[i].eby > 1000) {
      enemies.splice(i, 1);
      bx = ssx + 21;
      by = 690;
      score += 5;
    }
  }
}
function enemyMovements() {
  for (i = 0; i < enemies.length; i++) {
    if (time/60 >= 3 && time/60 < 5.5) {
      enemies[i].move1();
    }
    else if (time/60 >= 5.5 && time/60 < 6.5) {
      enemies[i].move2();
    }
    else if (time/60 >= 12.5 && time/60 < 14) {
      enemies[i].move5();
    }
    else if (time/60 >= 14 && time/60 < 15.4) {
      enemies[i].move6();
    }
    // reset enemy position above screen when they leave the screen
    if (enemies[i].y > 800) {
      enemies.splice(i, 1);
    }
  }
  for (i = 0; i < enemies.length; i++) {
    for (j = 0; j < 5; j++) {
      if (time/60 >= 6.5 + j && time/60 < 7 + j) {
        enemies[i].move3();
      }
      else if (time/60 >= 7 + j && time/60 < 7.5 + j) {
        enemies[i].move4();
      }
    }
  }
  for (i = 0; i < enemies.length; i++) {
    for (j = 0; j < 10; j++) {
      if (time/60 >= 15.5 + j && time/60 < 16 + j) {
        enemies[i].move3();
      }
      else if (time/60 >= 16 + j && time/60 < 16.5 + j) {
        enemies[i].move4();
      }
    }
  }
}
function stages() {
  // stage 1
  if (stagen == 1) {
    for (var i = 0; i < 5; i++) {
      enemies[i] = new Flyenemy(i*45 - 250, 250);
    }
    for (var i = 5; i < 10; i++) {
      enemies[i] = new Flyenemy((i-5)*45 - 250, 300);
    }
  }
  // stage 2
  if (stagen == 2) {
    for (i = 0; i < 5; i++) {
      enemiesA[i] = new Alienenemy(i*50 + 150, 200)
    }
  }
}

// OBJECT CONSTRUCTORS FOR ENEMIES
function Flyenemy(x, y) {
  this.x = x;
  this.y = y;
  this.ebx = this.x + 23;
  this.eby = this.y + 25;
  this.display = function() {
    fill(221, 44, 0);
    ellipse(this.ebx, this.eby, 8, 16);
    image(flyenemy, this.x, this.y, flyenemy.width/40, flyenemy.height/40);
  }
  this.move1 = function() {
    this.x += 5
    this.y += 0
    this.ebx += 5
    this.eby += 0
  }
  this.move2 = function() {
    this.x += 1
    this.y += -1
    this.ebx += 1
    this.eby += -1
  }
  this.move3 = function() {
    this.x += 1
    this.ebx += 1
  }
  this.move4 = function() {
    this.x -= 1
    this.ebx -= 1
  }
  this.move5 = function() {
    this.x += -2
    this.y += 5
    this.ebx += -2
    this.eby += 5
  }
  this.move6 = function() {
    this.x += -3
    this.y += -5
    this.ebx += -3
    this.eby += -5
  }
}

// ALL SHIP FUNCTIONS
function shipBasics() {
  shipMovement(); bullet();  edges();  lives(); enemyHitsShip();
  image(spaceship, ssx, ssy, spaceship.width/5, spaceship.height/5);
}
function shipMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    ssx -= 5
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ssx += 5
  }
}
function edges() {
  fill(255);
  rect(115, 0, 3, 850); // left borderline
  rect(810, 0, 3, 850); // right borderline

  // keep ship in bounds
  if (ssx <= 120) {
    ssx = 120;
  }
  if (ssx >= 810 - spaceship.width/6) {
    ssx = 810 - spaceship.width/6;
  }
  // keep bullet in bounds
  if (bx <= 138) {
    bx = 138;
  }
  if (bx >= 796) {
    bx = 796;
  }
}
function lives() {
  if (nlives < 0) {
    ssx = -1000;
  }
  for (i = 1; i < 5; i++) {
    if (nlives == i) {
      image(spaceship, 150 + i*spaceship.width/6.3, 765 - spaceship.height/6.3, spaceship.width/6.3, spaceship.height/6.3)
    }
  }
  if (nlives === 0) {
    textSize(20)
    text("last life", 130, 750);
  }
  else if (nlives < 0) {
    by = 100000
    textSize(100)
    text("GAME OVER:", 170, 300)
    text("REFRESH", 225, 400)
  }
  if (score === 50) {
    nlives ++
    score = 0;
  }

  textSize(20);
  fill(255)
  text("1UP", 200, 50);
  text(score + "/100", 190, 75);
}
function bullet() {
  // the bullet
  fill(255);
  ellipse(bx, by, 8, 8);
  // move the  bullet while stored
  if (keyIsDown(LEFT_ARROW) && by == 690) {
    bx -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) && by == 690) {
    bx += 5;
  }
  // reset the bullet after its leaves the screen
  if (by <= 0) {
    by = 690;
    bx = ssx + 21;
  }
  // keep the bullet moving upwards
  if (by < 690 && keyCode == RIGHT_ARROW) {
    by -= speed;
  }
  if (by < 690 && keyCode == LEFT_ARROW) {
    by -= speed;
  }
  // shoot the  bullet
  if (keyCode == UP_ARROW) {
    by -= speed
  }
}
function enemyHitsShip() {
  for (i = 0; i < enemies.length; i++) {
    if (enemies[i].x > ssx && enemies[i].x < ssx + 30 && enemies[i].y + 25 > 655 ) {
      ssy = 10000
      by = 10000
      time = -180
      nlives = nlives -= 1
    }
    // reset ship and bullet after 3 seconds then the level restarts
    if (time/60 == -3) {
      time ++
      ssy = 665
      by = 690
      enemies.splice(0, enemies.length)
      stages();
    }
    if (time/60 < 0) {
      textSize(50);
      text("READY", 375, 200);
    }
  }
}

// ALL MISC FUNCTIONS
function miscBasics() {
  timer();
  changeStage();
  stars();
}
function timer () {
  time ++
  textSize(20);
  fill(255);
  text("S1time:" + round(time/60), 20, 100);
}
function changeStage() {
  if (time/60 >= 0 && time/60 < 3 && stagen == 1) {
    textSize(50);
    text("STAGE 1", 360, 200);
  }
  if (enemies.length === 0 && stagen == 1) {
    stagen = 2
    time = -180
  }
  if (stagen == 2 && time < 0) {
    time ++
    score = score;
    textSize(50);
    text("STAGE 2", 360, 200);
  }
}
function stars() {
  // quadrant 1
  for (i = 0; i < 6; i++) {
    noStroke();
    fill(random(0, 255), random(0, 255), random(0, 255))
    ellipse(482 + i*64, random(0, height/2), 2, 10);
  }
  // quadrant 2
  for (i = 0; i < 6; i++) {
    noStroke();
    fill(random(0, 255), random(0, 255), random(0, 255))
    ellipse(130 + i*64, random(0, height/2), 2, 10);
  }
  // quadrant 3
  for (i = 0; i < 6; i++) {
    noStroke();
    fill(random(0, 255), random(0, 255), random(0, 255))
    ellipse(130 + i*64, random(height/2, height), 2, 10);
  }
  // quadrant 4
  for (i = 0; i < 6; i++) {
    noStroke();
    fill(random(0, 255), random(0, 255), random(0, 255))
    ellipse(482 + i*64, random(height/2, height), 2, 10);
  }
}
