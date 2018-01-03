var words = ["cat","dog","bird","elephant"];
var randomNumber = Math.floor[Math.random()*words.length];
var randomWord = words[randomNumber]
var wordSplit = randomWord.split("");
var guesses=[];
var guessesRight = [];
var guessesWrong = [];
var underScore = [];
var numGuessesWrong = 0;
var userGuess = 0;

function setup(){
  createCanvas(1000,1000)
}

function draw(){
    generateUnderScores();
    guess();
    drawGuesses();
}

function generateUnderScores(){
  for (var i =0; i<randomWord.length; i++){
  underScore.push('_')
}
  var output = '';
  for(var x=0; x<underScore.length; x++){
      output+= underScore[x] + " ";
  }

  }

function guess(){
  while (numGuessesWrong == 0){
    var userGuess = prompt("Enter a letter.")
    while (guesses.indexOf(userGuess.toLowerCase()) >= 0) {
     alert("You have already guessed that letter. Try again");
     userGuess = prompt("What letter would you like to guess?");
 }

    for (x = 0; x < wordSplit.length; x++) {

     if (userGuess == wordSplit[x]) {
         guesses.push(userGuess);
         underscore.replace([x], userGuess);
     else if (userGuess != wordSplit[x]) {
         guessesWrong.push(userGuess);
         numGuessesWrong+;
     }
     else if (userGuess != secretWord && numGuessesWrong === 7) {

         alert("Game Over");
     }
 element.innerHTML = guessesWrong;
  }
}
function drawGuesses(){
rect(100,50,150,1);
rect(100,50,1,350);
rect(35,400,150,1);
rect(250,50,1,50);
}

  if (numGuessesWrong = 1){
    ellipse(250,120,0);
  }
  if(numGuessesWrong = 2){
    rect(250,150,1,150);
  }
  if(numGuessesWrong = 3){
    line(250, 200, 175, 175);
  }
  if(numGuessesWrong = 4){
    line(250, 200, 325, 180);
  }
  if(numGuessesWrong = 5){
    line(250, 300, 200, 340);
  }
  if(numGuessesWrong = 6){
    line(250, 300, 300, 345);
  }
   }

}
