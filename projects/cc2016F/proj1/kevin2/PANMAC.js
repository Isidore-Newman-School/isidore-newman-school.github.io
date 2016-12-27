var running = true;
var started = [false, false, false];
var floatnum;
var savagery = 1;
var jellyfloaters = [];
var hardmode;
// var sounds = [];

// function preload() {
// 	sounds[0] = loadSound('media/FIRED.wav');
// }

function setup () {
	createCanvas (600, 600);
	floatnum = prompt("Floaters present:")
	for(var c = 0; c < floatnum; c++) {
		jellyfloaters[c] = new Jellyfloater();
	}
}

function draw () {
	homescreen();
	if(running == true && started[0] == true) {
		background (0, 0, 0);
		trumpcard.clock();
		trumpcard.move();
		text("HARAMBE",plebe.position[0], plebe.position[1]);
		text("Hold Q to pause", 0, 20);
		for(var c = 0; c < floatnum; c++) {
			jellyfloaters[c].draw();
			if(c % 2 == 0) {
				jellyfloaters[c].collide();
				jellyfloaters[c].move();
				fill(0, 0, 255);
			}
			else {
				jellyfloaters[c].collidebad();
				jellyfloaters[c].movesimple();
				fill(0, 255, 0);
			}
		}
		plebe.move();
		if(plebe.airtime > 3000) {
			background(random(0, 255), random(0, 255), random(0, 255));
			// background(0, 0, 0);
			text("WINNER WINNER CHIKUN DINNER", (width / 2) - 160, height / 2);
			for(var t = 0; t < 100; t++) {
				textSize(20);
				for(var z = 0; z < 5; z ++) {
					ellipse(random(0, width), random(0, (height / 2) - 40), 40, 40);
					ellipse(random(0, width), random((height / 2) + 40, height), 40, 40);
				}
				ellipse(random(0, 100), random((height / 2) - 40, (height / 2) + 40), 40, 40);
				ellipse(random(500, 600), random((height / 2) - 40, (height / 2) + 40), 40, 40);
				fill(random(0, 255), random(0, 255), random(0, 255));
				// fill(0, 255, 10);
				plebe.position[1] = 200;
			}
		}
		else {
			textSize(15);
		}
	}
	else if(running == true && started[1] == true){
		background (0, 0, 0);
		trumpcard1.draw();
		trumpcard1.move();
		trumpcard1.collide();
		text("TRUMP",plebe.position[0], plebe.position[1]);
		plebe.move();
		if(plebe.airtime > 1 && plebe.airtime % 50 == 1) {
			trumpcard1.dimensions[0] *= .98;
			if(trumpcard1.dimensions[0] < 5) {
				trumpcard1.dimensions[0] = 5;
				hardmode = 1;
			}
		}
	}
	if(keyIsDown(81)) {
		running = false;
	}
	else {
		running = true;
	}
}

function homescreen() {
	background(0, 0, 0);
	text("1: Normal, 2: Experimental, 3: Snakes", (width / 2) - 100, height / 2);
	text("Epilepsy warning", (width / 2) - 100, 400);
	fill(0, 255, 0);
	if(keyIsDown(49)) {
		started[0] = true;
	}
	if(keyIsDown(50)) {
		started[1] = true;
	}
	if(keyIsDown(51)) {
		started[2] = true;
	}
}

var plebe = {
	radius: 10,
	position: [10, 590],
	momentum: [0, 0],
	airtime: 0,
	mass: 2,
	size: 10,
	floats: 50,
	move: function() {
		if(keyIsDown(32)) {
			//Pressed Spaice
			if(plebe.floats > 1) {
					plebe.momentum[1] += (1 / plebe.mass);
					plebe.floats -= 1;
			}
		}
		if(keyIsDown(65)) {
			//Pressed A

			plebe.momentum[0] -= (.5 / plebe.mass);
		}
		if(keyIsDown(68)) {
			//Pressed D

			plebe.momentum[0] += (.5 / plebe.mass);
		}
		if(keyIsDown(16)) {
			//Pressed Shift
			if(plebe.floats > 1) {
				plebe.momentum[0] *= 1.04;
				plebe.momentum[1] *= 1.04;
				plebe.floats -= .2;
			}
		}
		if(plebe.position[1] > 599 - plebe.radius) {
			plebe.position[1] = 599 - plebe.radius;
			plebe.position[1] -= 1;
			plebe.floats = 100;
			plebe.airtime = 0;
			if(plebe.momentum[1] < -2) {
				plebe.momentum[1] = -2;
			}
		}
		if(plebe.position[1] < 10) {
			plebe.position[1] += 10;
			plebe.momentum[1] = 0;
		}
		if(plebe.position[0] > 535) {
			plebe.position[0] = 535;
			plebe.momentum[1] += abs(plebe.momentum[0] / 3);
			plebe.momentum[0] -= 5;
		}

		if(plebe.position[0] < 0) {
			plebe.position[0] = 0;
			plebe.momentum[1] += abs(plebe.momentum[0] / 3);
			plebe.momentum[0] += 5;
		}

		if(plebe.position[1] < 600 - plebe.radius) {
			plebe.position[1] -= plebe.momentum[1];
			plebe.momentum[1] -= .05;
			plebe.position[0] += plebe.momentum[0];

			if(plebe.position[1] < 599 - plebe.radius) {
				plebe.airtime += 1;
			}

			plebe.momentum[0] = plebe.momentum[0] / (1 + (.04 / plebe.mass));
			if(abs(plebe.momentum[0]) < .01) {
				plebe.momentum[0] = 0;
			}

			text(plebe.floats, 570, 10);
			text(plebe.airtime, 570, 30);
			if(plebe.floats > 300) {
				plebe.floats = 300;
			}
		}
	}
};

function Jellyfloater() {
	this.momentum = [random(-2, -1.5) || random(1.5, 2), random(-2, -1.5) || random(-2, -1.5)];
	this.radius = 30;
	this.radiusbad = 50;
	this.position = [random(this.radius + 1, 599 - this.radius), random(this.radius + 1, 599 - this.radius)];
	this.move = function() {
		this.position[0] += this.momentum[0];
		this.position[1] += this.momentum[1];
		if(this.position[0] > (600 - this.radius)) {
			this.momentum[0] = -(random(.75, 1.25)) * this.momentum[0];
			this.momentum[1] = -(random(.75, 1.25)) * this.momentum[1];
			this.position[0] -= 15;
		}
		if(this.position[0] < this.radius) {
			this.momentum[0] = -(random(.75, 1.25)) * this.momentum[0];
			this.momentum[1] = -(random(.75, 1.25)) * this.momentum[1];
			this.position[0] += 15;
		}
		if(this.position[1] < this.radius || this.position[1] > 600 - this.radius) {
			this.momentum[0] *= -1;
			this.momentum[1] *= -1;
			this.position[1] += ((height / 2) - this.position[1]) / 100;
		}
		this.momentum[0] -= random(-.4, .4);
		this.momentum[1] += random(-.4, .4);
		if(abs(this.momentum[0]) > 3) {
			this.momentum[0] *= .8;
		}
		if(abs(this.momentum[1]) > 3) {
			this.momentum[1] *= .8;
		}
		if(abs(this.momentum[0]) < .5) {
			this.momentum[0] *= 1.1;
		}
		if(abs(this.momentum[1]) > .5) {
			this.momentum[1] *= 1.1;
		}
	}
	this.movesimple = function() {
		this.position[0] += this.momentum[0];
		this.position[1] += this.momentum[1];
		if(this.position[0] > (600 - this.radius)) {
			this.momentum[0] = -(random(.5, 1.5)) * this.momentum[0];
			this.momentum[1] = -(random(.5, 1.5)) * this.momentum[1];
			this.position[0] -= 10;
		}
		if(this.position[0] < this.radius) {
			this.momentum[0] = -(random(.5, 1.5)) * this.momentum[0];
			this.momentum[1] = -(random(.5, 1.5)) * this.momentum[1];
			this.position[0] += 10;
		}
		if(this.position[1] < this.radius || this.position[1] > 600 - this.radius) {
			this.momentum[0] *= -1;
			this.momentum[1] *= -1;
		}
		if(abs(this.momentum[0]) > 5) {
			this.momentum[0] *= .9;
		}
		if(abs(this.momentum[1]) > 5) {
			this.momentum[1] *= .9;
		}
		this.momentum[0] += random(-.3, .3);
		this.momentum[1] += random(-.3, .3);
		this.momentum[0] *= 1 - random(-.3, .3);
		this.momentum[1] *= 1 - random(-.3, .3);
	}
	this.draw = function() {
		ellipse(this.position[0], this.position[1], this.radius, this.radius);
		// main tail
		for(var j = 0; j < 10; j++) {
			ellipse(this.position[0] - (j * this.momentum[0]), this.position[1] - (j * this.momentum[1]), this.radius / (j * 2), this.radius / (j * 2));
		}
	}
	this.collide = function() {
		if(abs(this.position[0] - (plebe.position[0] + 30)) < this.radius && abs(this.position[1] - plebe.position[1]) < this.radius) {
			plebe.floats += 5;
		}
	}
	this.collidebad = function() {
		if(abs(this.position[0] - (plebe.position[0] + 30)) < this.radiusbad && abs(this.position[1] - plebe.position[1]) < this.radiusbad) {
			plebe.floats -= savagery;
			plebe.momentum[1] -= savagery / 50;
		}
		//Chase plebe
		this.momentum[0] += (map((plebe.position[0] - this.position[0]), 200, 0, 1, .15));
		this.momentum[1] += (map((plebe.position[1] - this.position[1]), 200, 0, 1, .15));
	}
}

var trumpcard = {
	position: [300, 300],
	trail: [[], [], []],
	radius: 10,
	momentum: [0, -4],
	continue: false,
	time: 0,
	long: 50,
	turnspeed: 10,
	clock: function() {
		// for(var c = 0; c < 2; c++) {
			this.trail[0][this.time] = this.position[0];
			this.trail[1][this.time] = this.position[1];
			this.time += 1;
			this.trailer();
			if(this.time > this.long) {
				for(var d = 0; d < this.time; d++) {
					this.trail[0][d - 1] = this.trail[0][d];
					this.trail[1][d - 1] = this.trail[1][d];
				}
				this.time = this.long;
			}
	},
	trailer: function() {
		for(var c = 0; c < this.time; c++) {
			ellipse(this.trail[0][c - 1] /*+ random(-.5, .5)*/, this.trail[1][c - 1] /*+ random(-.5, .5)*/, 20 /*+ random(0,5)*/, 20 /*random(0, 5)*/);
			fill(random(0, 50), c * 4, random(0, 100));
		}
	},

	move: function() {
		//Main Movement
		if(keyIsDown(32)) {
			//Pressed Spaice
			// this.momentum[1] *= 1.1;
			// this.momentum[0] *= 1.1;
			this.turnspeed *= .9;
			// if(isLoaded() == true) {
			// 	sounds[0].play();
			// }
		}
		// if(keyIsDown(83)) {
		// 	this.momentum[1] += .5;
		// }
		// if(keyIsDown(68)) {
		// 		this.momentum[1] += (this.momentum[0] / (100 / this.turnspeed));
		// 		this.momentum[0] -= (this.momentum[1] / (100 / this.turnspeed));
		// }
		// if(keyIsDown(65)) {
		// 	this.momentum[1] -= (this.momentum[0] / (100 / this.turnspeed));
		// 	this.momentum[0] += (this.momentum[1] / (100 / this.turnspeed));
		// }
		this.position[0] += this.momentum[0];
		this.position[1] += this.momentum[1];
		if(this.position[0] < this.radius || this.position[0] > 600 - this.radius) {
			this.momentum[0] *= -1;
			this.momentum[1] *= 1;
			this.position[0] += ((width / 2) - this.position[0]) / 100;
		}
		if(this.position[1] < this.radius || this.position[1] > 600 - this.radius) {
			this.momentum[0] *= 1;
			this.momentum[1] *= -1;
			this.position[1] += ((height / 2) - this.position[1]) / 100;
		}
		this.momentum[0] -= random(-1, 1);
		this.momentum[1] += random(-1, 1);
		// if(second() % 2 == 0) {
		// 	this.momentum[0] *= random(-1, -.5);
		// }
		if(abs(this.momentum[0]) > 4) {
			this.momentum[0] *= .91;
		}
		if(abs(this.momentum[1]) > 4) {
			this.momentum[1] *= .91;
		}
		if(abs(this.momentum[0]) < .5) {
			this.momentum[0] *= 1.1;
		}
		if(abs(this.momentum[1]) < .5) {
			this.momentum[1] *= 1.1;
		}
		if(this.turnspeed < 10) {
			this.turnspeed *= 1.1;
			if(this.turnspeed < 7) {
				this.turnspeed *= 1.1;
				if(this.turnspeed < 5) {
					this.turnspeed *= 1.1;
				}
			}
		}
	},
};
var trumpcard1 = {
	position: [300, 300],
  upmove: 0,
  dimensions: [200, 10],
	draw: function() {
		//Main Body
		rect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
		fill(0, 200, 20);
	},
	move: function() {
		//Main Movement
		if(keyIsDown(32)) {
			//Pressed Spaice
			this.position[0] += 4;
		}
		if(keyIsDown(65)) {
			this.position[0] -= 4;
		}
    if(hardmode == 1) {
      if(keyIsDown(68)) {
        this.upmove += .3;
      }
      this.position[1] -= this.upmove;
      this.upmove -= .1;
      if(this.position[1] > 570) {
        this.upmove = 0;
        this.upmove += .3;
        this.position[1] = 570;
      }
    }
	},
  collide: function() {
    if(plebe.position[0] - this.position[0] < this.dimensions[0] && plebe.position[0] - this.position[0] > - 60 && this.position[1] - plebe.position[1] < 10 /*plebe height*/ && this.position[1] - plebe.position[1] > 0) {
      plebe.momentum[1] *= -1;
      plebe.momentum[0] += random(-3, 3);
      plebe.floats = 100;
    }
  }
};
