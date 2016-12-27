//dates[0] = year; dates[1] = month; dates[2] = day
//   4/17 was the first day that both Clinton and Trump tweeted
var startMonth = 4;
var startDay = 17;

var dates;

var rangeOfDates = 0;
var tweets;
var beginDayCount = 0;

var daysInMonth = 30;
var slideRectX = 400;
var slideRectY = 100; 
var slideRectWidth = 50;
var slideRectHeight = 100;
var slidePressedBool = false;
var canvasWidth = 900;
var canvasHeight = 900;
var prevMouseX = 0;
var slideRectUpLimit = 800
var slideRectDownLimit = 400;

var beginDay = 0;
var beginMonth = 0;
var beginYear = 0;

var year;
var month;
var day;

var dateText = 0;
var handles;

var subjectLinesArr;

function preload() {

  //load the tweets
  tweets = loadTable("tweets.csv","csv", "header");

}

function setup() {

  //get the account column 
  handles = tweets.getColumn("handle");

  //offset the slide a little more to the left
  slideRectX = slideRectX - slideRectWidth;


  createCanvas(canvasWidth,canvasHeight);

  console.log(tweets.getRowCount());

  //only loop once 
  noLoop();

  //get the time/date column from the dataset
  dating = getDatesFormat(tweets.getColumn("time"));
  console.log(dating);

}

function draw() {

  //display the date and current day alert
  displayDate();

  //get some data from the tweets dataset
  var numTweets = tweets.getRowCount();
  var retweetArray = tweets.getColumn("is_retweet");
  var handleArray = tweets.getColumn("handle");

  //variables for stats about Clinton and Trump tweets
  var numTrumpTweets = 0;
  var numClintonTweets = 0;
  var origTrumpTweets = 0;
  var origClintonTweets = 0;

  //go through all of the tweets
  for(var i = 0; i < numTweets; i++) {

    //if the tweet is from hillary..
    if(handleArray[i] === "HillaryClinton") {

      //take stat and see if tweet is original (or retweeted)
      numClintonTweets++;
      if(retweetArray[i] === "FALSE") {

        origClintonTweets++;

      }

    }
    //do same stats for trump
    else if(handleArray[i] === "realDonaldTrump") {

      numTrumpTweets++;

      if(retweetArray[i] === "FALSE") {

        origTrumpTweets++;

      }

    }

  }

  //get the initial date stats from the dataset
  getDates();

  //indicating past and present
  stroke(0);
  text("Present", slideRectDownLimit-100,slideRectY + slideRectHeight/2);
  text("Past", slideRectUpLimit+50,slideRectY + slideRectHeight/2);

  //make the background line for slide 
  stroke(0,255,0);
  strokeWeight(10);
  line(slideRectDownLimit, slideRectY + slideRectHeight/2, slideRectUpLimit, slideRectY + slideRectHeight/2);
  strokeWeight(1);

  //make the slide color red and display the rectangle
  fill(255,0,0);
  rect(slideRectX, slideRectY, slideRectWidth, slideRectHeight);

  //debug for tweet stats
  console.log("Trump tweets: " + numTrumpTweets);
  console.log("Clinton tweets: " + numClintonTweets);
  console.log("origTrumpTweets: " + origTrumpTweets);
  console.log("origClintonTweets: " + origClintonTweets);
  console.log("Origin Clinton Percentage: " + ((origClintonTweets/numClintonTweets) * 100) + "%");
  console.log("Origin Trump Percentage: " + ((origTrumpTweets/numTrumpTweets) * 100) + "%");

}

//this function organizes the time column into more manageable integers (for easier reference)
function getDatesFormat(dats) {

  //overall array
  var arr = [];

  //go through each date
  for(var i = 0; i < dats.length; i++) {

    //inner array and previous index 
    var inArr = [];
    var prevIndex = 0;

    //go through the characters in this string
    for(var j = 0; j < dats[i].length; j++) {

      //if '-' or 'T' are in the string, we want to splice this string to create integers
      if(dats[i].charAt(j) == '-' || dats[i].charAt(j) == 'T') {

        //add this integer to the inner array, then change the previous index value
        inArr.push(dats[i].substring(prevIndex, j));
        prevIndex = j + 1;

      }

    }

    //if we find the date is before our start date, we want to finish checking
    if(inArr[2] == startDay-1 && startMonth == inArr[1]) {

      return arr;

    }

    //add the inner array to the outer array
    arr.push(inArr);

  }
  // return the array
  return arr;

}

function getDates() {

  //store the dates of each tweet in the dates array
  dates = tweets.getColumn("time");

  //this is the index of the last tweet from hillary (because dataset includes more Trump tweets from further back)
  var endIndex = 0;

  //stores the date of the last tweet 
  var lastDate = 0;

  //stores the previous index for splicing dates from strings 
  var prevIndex = 0;

  //stores the individual specs (year, month, and day) from the date strings
  var indArray = [];

  //get the first date from the list
  var firstDate = dates[0];

  //go through all of the dates
  for(var j = 0;  j < dates.length; j++) {

    //store the current date string 
    lastDate = dates[j];

    //reset the indArray for next date
    indArray = [];

    //go through all characters in this string 
    for(var i = 0; i < lastDate.length; i++) {

      //when the character is a '-' or a 'T', the previous substring was a date
      if(lastDate.charAt(i) == '-' || lastDate.charAt(i) == 'T') {

        //add the spliced date spec to the indArray
        indArray.push(lastDate.substring(prevIndex, i));

        //make the new previous index the current index plus 1 (one more than the dash or T)
        prevIndex = i + 1;

      }

    }

    //if the current date's month is equal to the first day's month
      //day also has to be one less than the first day specified (so we include that last day)
    if(indArray[1] == startMonth && indArray[2] == startDay-1) {

      //set the end index so we can grab this date from the array
      endIndex = j - 1;

      //debug and break
      console.log("found month: " + indArray[1] + " day: " + indArray[2]);
      break;

    }

  }

  //debug
  console.log("End index: " + endIndex);

  //reset the index
  prevIndex = 0;

  //stores the individual components of the first date 
  var indFArray = [];

  //go through all characters of the first date
  for(var i = 0; i < firstDate.length; i++) {

    //if the character is a '-' or a 'T', then we want to splice the previous characters
    if(firstDate.charAt(i) == '-' || firstDate.charAt(i) == 'T') {

      //add this new date spec to the array
      indFArray.push(firstDate.substring(prevIndex, i));

      //reset the previous index value for next splice
      prevIndex = i + 1;

    }

  }

  //set the last year, month, and day variables
  year = parseInt(indArray[0], 10);
  month = parseInt(indArray[1], 10);
  day = parseInt(indArray[2], 10);

  //call the data range function to get the number of days beginning and end date
  rangeOfDates = dateRange(day, indFArray[2], month, indFArray[1], year, indFArray[0]);

  //debug 
  console.log(year + " " + month + " " + day);
  console.log(indArray);
  console.log(dates.length);
  console.log(lastDate);

}

//executes when the mouse is pressed (not necessarily released)
function mousePressed() {

  //make sure the mouse is in thes rectangle 
  if(mouseX > slideRectX && mouseX < slideRectX + slideRectWidth && mouseY > slideRectY && mouseY < slideRectY + slideRectHeight) {

    //set the boolean to true because we've selected the inside of the rectangle
    slidePressedBool = true;

    //initialize the previous mouse x-coordinate value
    prevMouseX = mouseX;

  }

}

//get the number of dates based on the month and day (we don't need to worry about years
    // because  all of these entries are in 2016)
function dateNumber(dayI, monthI) {

  return dayI + monthI * daysInMonth;

}


function findNextDate() {

  //go through each date in the dating array
  for(var i = 0; i < dating.length; i++) {

    //indar[0] = year; indar[1] = month; indar[2] = day 
    var dateNum = dateNumber(parseInt(dating[i][2]), parseInt(dating[i][1]));

    //continue until date is further back than the slide date
    if(dateNum <= beginDayCount + Math.floor(dateText * rangeOfDates / 100)) {

      //get the pie chart
      trumpVHillaryPieChart(handles.slice(0,i+1));
      
      //debug dateNum and get number of values spliced
      console.log(dateNum + "fefef");
      return i + 1;

    }

  }

}

//get the differnece in days between two dates
function dateRange(firstDay, secondDay, firstMonth, secondMonth, firstYear, secondYear) {

  //set initial variables
  beginDay = firstDay;
  beginMonth = firstMonth;
  beginYear = firstYear;

  //get day number for first date
  beginDayCount = beginDay + beginMonth * daysInMonth;

  //get variables for second date
  var difYear = secondYear - firstYear;
  var difMonth = secondMonth - firstMonth;
  var difDay = secondDay - firstDay;

  //get day number for second date
  var totalDays = difDay + difMonth * daysInMonth;

  //debug 
  console.log("Total days:" + totalDays);


  //check on this!
  return totalDays;

}

//displays the current percentage of the date range
function displayDate() {

  //make the text black
  stroke(0);
  fill(0);

  //display percentage
  text(dateText + "%", 100,100);

  //we also want to know the date number selected
  displayNumDays();

}

function displayNumDays() {

  //make text black
  stroke(0);
  fill(0);

  //display the date number selected
  text(Math.floor(dateText * rangeOfDates / 100) + " days from present", 100,200);
  
}

//for when the mouse is dragged
function mouseDragged() {

  //set the color to blue
  stroke(0,0,255);

  //debug lines (so the min and max limits are shown)
  /*line(slideRectDownLimit, 0, slideRectDownLimit, 700);
  line(slideRectUpLimit, 0, slideRectUpLimit, 700);*/

  //makes sure that the mouse is clicked
  if(slidePressedBool) {

    //get the difference in x coordinates
    var mouseDif = mouseX - prevMouseX;

    //make sure the slide rectangle is within the slide limits
    if((mouseDif < 0 && slideRectX + slideRectWidth + mouseDif >= slideRectDownLimit) || 
      (mouseDif > 0 && slideRectX + slideRectWidth + mouseDif <= slideRectUpLimit)) {

      //white background
      background(255);

      //change the position of the slide
      slideRectX += (mouseX - prevMouseX);

      //indicating past and present
      stroke(0);
      fill(0);
      text("Present", slideRectDownLimit-100,slideRectY + slideRectHeight/2);
      text("Past", slideRectUpLimit+50,slideRectY + slideRectHeight/2);

      //make the background line for slide 
      stroke(0,255,0);
      strokeWeight(10);
      line(slideRectDownLimit, slideRectY + slideRectHeight/2, slideRectUpLimit, slideRectY + slideRectHeight/2);
      strokeWeight(1);

      //make the slide color red and display the rectangle
      fill(255,0,0);
      rect(slideRectX, slideRectY, slideRectWidth, slideRectHeight);

      //get the percentage the slide has travelled
      dateText = 100 * (slideRectX + slideRectWidth- slideRectDownLimit) / (slideRectUpLimit-slideRectDownLimit);
      
      //display these values for debugging
      displayDate();

      //get the date the slide length corresponds to
      console.log(findNextDate());

    }
    
    //resets the previous x-coordinate position for reference
    prevMouseX = mouseX;

  }

}

//creates a pie chart 
function trumpVHillaryPieChart(arr) {

  //variables that keep track of number of each candidate's tweet count
  var clint = 0;
  var trump = 0;

  console.log(arr.length);

  //arr is an input array of who submitted which tweets
  for(var i = 0; i < arr.length; i++) {

    if(arr[i] === "HillaryClinton") {

      clint++;

    }
    else if(arr[i] === "realDonaldTrump") {

      trump++;

    }



  }

  //print number of clinton and trump tweets for debugging
  stroke(0,0,255);
  text("Clinton: " + clint, 350,300);
  stroke(0,255,0);
  text("Trump: " + trump, 350,400);

  //display an interactive pie chart comparing the tweets
  var totall = clint + trump;
  fill(0, 255, 0);
  var diameter = 300;
  arc(600, 350, diameter, diameter, 0, percentBigger(trump, totall) * 2 * PI);
  fill(0, 0, 255);
  arc(600, 350, diameter, diameter, percentBigger(trump, totall) * 2 * PI, 0);

}

//returns ratio for displaying pie chart
function percentBigger(num, tot) {

  return num/tot;
}