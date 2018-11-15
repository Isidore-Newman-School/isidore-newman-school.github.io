var hardmode = 1;

function setup () {
	createCanvas (600, 600);
  hardmode = prompt("Want hardmode? Enter 1");
}

function draw () {
	background (0, 0, 0);
	// trumpcard.clock();
	trumpcard.draw();
	trumpcard.move();
  trumpcard.collide();
	text("TRUMP",plebe.position[0], plebe.position[1]);
	plebe.move();
  if(plebe.airtime > 1 && plebe.airtime % 50 == 1) {
    trumpcard.dimensions[0] *= .5;
    if(trumpcard.dimensions[0] < 5) {
      trumpcard.dimensions[0] = 5;
      hardmode = 1;
    }
  }
	// if(plebe.airtime > 3000) {
	// 	background(random(0, 255), random(0, 255), random(0, 255));
	// 	// background(0, 0, 0);
	// 	text("WINNER WINNER CHIKUN DINNER", (width / 2) - 160, height / 2);
	// 	for(var t = 0; t < 100; t++) {
	// 		textSize(20);
	// 		for(var z = 0; z < 5; z ++) {
	// 			ellipse(random(0, width), random(0, (height / 2) - 40), 40, 40);
	// 			ellipse(random(0, width), random((height / 2) + 40, height), 40, 40);
	// 		}
	// 		ellipse(random(0, 100), random((height / 2) - 40, (height / 2) + 40), 40, 40);
	// 		ellipse(random(500, 600), random((height / 2) - 40, (height / 2) + 40), 40, 40);
	// 		fill(random(0, 255), random(0, 255), random(0, 255));
	// 		// fill(0, 255, 10);
	// 		plebe.position[1] = 200;
	// 	}
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
      plebe.momentum[0] += random(-2, 2);
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

var trumpcard = {
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
