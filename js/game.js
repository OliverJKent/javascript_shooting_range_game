function randomNum(num1, num2) { //reusable random number generator
  return(Math.floor(Math.random() * num1) + num2); //number is a value between num1 and num2
}

var targets = document.getElementsByClassName('targets'); //store HTML elements in variables for better readability
var scoreCount = document.getElementById('score');
var ammoCount = document.getElementById('ammo');
var clickArea = document.getElementsByClassName('gameArea')[0];
var flash = document.getElementById('redFlash');
var timer = document.getElementById('countdown');
var highScoreDisplay = document.getElementById('highestScore');
var birdControl = document.getElementById('bird');

if (localStorage.hasOwnProperty('highScoreList') === false) { //If local storage for the high scores has not been created
  localStorage.setItem('highScoreList', JSON.stringify([0, 0, 0, 0, 0]));  //create one and set it to the default values
}

var scores = JSON.parse(localStorage.getItem('highScoreList'));
highScoreDisplay.innerHTML = scores[0]; //display the stored high score

var seconds = 0;
setInterval(function() { //this function repeats once per second, the game will end after 30 seconds
  seconds++; //add one to the total number of seconds
  timer.innerHTML -= 1; //take one off the time remaining
  if (seconds === 30) { //if the time is up
    clearInterval(); //stop the interval
    $('#targetDiv1, #targetDiv2, #targetDiv3, #scoreDisplay, #redFlash, #reload, #menuButton, #remaining').remove(); //remove these elements
    var newHeading = document.createElement("h1"); //create a new heading that tells you time is up
    newHeading.style.textAlign = "center";
    if (parseInt(scoreCount.innerHTML) > scores[0]) {
      newHeading.innerHTML = "Time is up! You set a new highscore: "+parseInt(scoreCount.innerHTML);
      $('#highScoreDisplay').remove();
    } else {
      newHeading.innerHTML = "Time is up! Final score: "+parseInt(scoreCount.innerHTML);
    }
    var newButton = document.createElement("button"); //create buttons to try again or return to the menu
    newButton.className = "buttons";
    newButton.style.textAlign = "center";
    newButton.innerHTML = "Try Again";
    var newButton2 = document.createElement("button");
    newButton2.className = "buttons";
    newButton.addEventListener('click', function() {
      location.reload()
    });
    newButton2.style.textAlign = "center";
    newButton2.innerHTML = "Menu";
    newButton2.addEventListener('click', function() {
      location.href="index.html"
    });
    document.getElementById('gameArea').appendChild(newHeading);
    document.getElementById('gameArea').appendChild(document.createElement("br"));
    document.getElementById('gameArea').appendChild(newButton);
    document.getElementById('gameArea').appendChild(document.createElement("br"));
    document.getElementById('gameArea').appendChild(document.createElement("br"));
    document.getElementById('gameArea').appendChild(newButton2);
    scores.push(parseInt(scoreCount.innerHTML)); //add the current score to the array
    scores.sort(function(a, b){return b - a}); //order the array numerically from highest to lowest
    scores.pop(); //remove the last item from the array, we only want the top 5 scores stored
    localStorage.setItem('highScoreList', JSON.stringify(scores)); //convert to a string and update the stored scores
    }
}, 1000);

window.addEventListener("keyup", dealWithKeyboard, false);

function dealWithKeyboard() {
  ammoCount.innerHTML = "Reloading...";
  setTimeout(function(){ ammoCount.innerHTML = 8;}, 2000);  // gets called when any of the keyboard events are overheard
}

clickArea.addEventListener('click', function() { //deplete ammo when clicking in game area
  if (ammoCount.innerHTML > 0) {
  ammoCount.innerHTML = parseInt(ammoCount.innerHTML - 1);
} else if (ammoCount.innerHTML === "Reloading...") { //if the player is reloading, do nothing
} else {
    flash.style.color = "red"; //ammo counter will flash red if there is no ammo left
    setTimeout(function(){ flash.style.color = "black";}, 300);
}
});

for(let box of targets){ //target logic
  box.style.visibility = "hidden"; //the targets are hidden to start with
  var size = randomNum(50, 25);
  box.style.height = size + "px"; //the size of the targets is random
  box.style.width = size + "px";
  setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1; ;}, randomNum(10000, 500)); //targets will appear after a random time interval
  setTimeout(function(){ box.style.opacity = 0; setTimeout(function(){box.style.visibility = "hidden";},500);}, randomNum(2000, 5000)); //targets will disappear after a few seconds if they are not clicked
  box.addEventListener('click', function() { //when a target is clicked
    if (ammoCount.innerHTML > 0) { //if there is enough ammo
      box.style.opacity = 0; //hide the target
      box.style.visibility = "hidden";
      scoreCount.innerHTML = eval(parseInt(scoreCount.innerHTML) + 1); //add one to the player's score
      setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum(10000, 5000)); //the target will reappear after a random time interval
      setTimeout(function(){ box.style.opacity = 0; setTimeout(function(){box.style.visibility = "hidden";},500);}, 5000);
      }
  });
  }

setTimeout(function() { //this function makes a bird fly across the screen
  birdControl.style.opacity = 1;
  birdControl.style.marginLeft = "730px"
  setTimeout(function(){ birdControl.style.opacity = 0; },8000);
}, 10000);

birdControl.addEventListener('click', function() {
if (ammoCount.innerHTML > 0) {
  scoreCount.innerHTML = eval(parseInt(scoreCount.innerHTML) + 1);
  birdControl.style.opacity = 0;
  birdControl.style.marginLeft = 0;
  scoreCount.innerHTML = (parseInt(scoreCount.innerHTML) + 5);
}
});
