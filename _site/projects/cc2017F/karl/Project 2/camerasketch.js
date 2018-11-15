var points = [];
var canvasP5;
var videoP5;
var bundtcake;
var bundtcakex = Math.floor(Math.random() * 320) + 80
var bundtcakey = Math.floor(Math.random() * 200) + 25


var vidW = 400;
var vidH = 300;
var vidX = 0;
var vidY = 100;

function setup() {
  videoP5 = createCapture(VIDEO);
  bundtcake=loadImage("lemon.png")
  videoP5.id("video");
  videoP5.size(vidW, vidH);
  videoP5.position(vidX, vidY);


  canvasP5 = createCanvas(vidW, vidH);
  canvasP5.position(vidX, vidY);

  var tracker = new tracking.LandmarksTracker();
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });
  tracker.on('track', function(event) {
    if(!event.data) return;
    event.data.landmarks.forEach(function(landmarks) {
      points = [];
      for(var l in landmarks){
        points.push({x: landmarks[l][0], y: landmarks[l][1]});
      }
    });

  });
}

function draw() {
  image(videoP5, 0, 0);
  fill(255, 0, 0);



  if (points.length > 24) {
    // left eye
    //ellipse(points[20].x, points[20].y + 10, 50, 50);

    // right eye
    //ellipse(points[24].x, points[24].y + 10, 50, 50);

    image(bundtcake, bundtcakex, bundtcakey, 50, 50);
  //  image(bundtcake, Math.floor(Math.random() * 600) + 1 , Math.floor(Math.random() * 400) + 1 , 50, 50);
  checkEachBundt();

}
}

function checkEachBundt(){
  var mouthx = points[30].x-25
  var mouthy = points[30].y-25
  var bundtx = bundtcakex
  var bundty = bundtcakey
  var d = sqrt((mouthx-bundtx)*(mouthx-bundtx)+(mouthy-bundty)*(mouthy-bundty))
  if (d < 25){
    //image(bundtcake, bundtcakex, bundtcakey, 50, 50);
    bundtcakex = Math.floor(Math.random() * 270) + 50
    bundtcakey = Math.floor(Math.random() * 200) + 50
  }




}
