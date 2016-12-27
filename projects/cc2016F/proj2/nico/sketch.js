var table;
var table1;
var p;
var start;

function preload() {
  table = loadTable("mc deaths.csv", "csv", "header");
  table1 = loadTable("total_deaths.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 600);
  //count the rows and columns
  // console.log(table.getRowCount() + " total rows in table");
  // console.log(table.getColumnCount() + " total columns in table");

  //cycle through the table
  // for (var r = 0; r < table.getRowCount(); r++)
  //   for (var c = 0; c < table.getColumnCount(); c++) {
  //     console.log(table.getString(r, c));
  //   }
  
  colorMode(HSB, 255);
 
}

function getTotalDeaths() {
  var total = 0;
  for (var r = 0; r < table1.getRowCount(); r++) {
    total += parseInt(table1.getString(r, 1));
  }
  //console.log(total);
  return total;
}

function draw() {
  createCanvas(500, 500)
  text("Total deaths: " + getTotalDeaths(), 155, 30)
  var whereToStart  = 0;
  for (var r = 0; r < table1.getRowCount(); r++){
    var rowthing = table1.getString(r,1);
    var p = getPercent(rowthing, getTotalDeaths());
    fill(r*60, 255, 255);
    stroke(0)
    arc(200,200,300,300, radians(whereToStart*360), radians(360*(p+whereToStart)), PIE);
    console.log(r + " " + table1.getString(r, 1) + " " +  whereToStart*360 + " " + 360*(p+whereToStart));
    fill(0);
    stroke(r*60, 255, 255);
    text("Season " + table1.getString(r,0) + ": " + table1.getString(r,1) + " (" + round(p*100) + "%" + ")",cos(radians(whereToStart*360))*150+200, sin(radians(whereToStart*360))*150+200);
    whereToStart += p
    fill(0)
    
  }
}

function getPercent(number, total) {
  return number / total;
}
