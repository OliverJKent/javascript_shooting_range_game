function randomNum() { //random number generator for the time targets take to appear/reappear
  return(Math.floor(Math.random() * 10000) + 500); //number is between 1000 and 10000
}

function randomNum2() {
  return(Math.floor(Math.random() * 35000) + 25000); //number is between 25000 and 35000
}

function randomNum3() { //random number generator for the size of the targets
  return(Math.floor(Math.random() * 60) + 25); //number is between 100 and 25
}

function randomNum4() { //random number generator for the time the bird takes to appear
  return(Math.floor(Math.random() * 15000) + 10000); //number is between 13000 and 15000
}

var targets = document.getElementsByClassName('targets'); //these variables will allow the HTML to be edited later
var scoreCount = document.getElementById('score');
var ammoCount = document.getElementById('ammo');
var clickArea = document.getElementsByClassName('gameArea')[0];
var reload = document.getElementById('reload');
var flash = document.getElementById('redFlash');
var timer = document.getElementById('countdown');
var highScoreDisplay = document.getElementById('highestScore');
var birdControl = document.getElementById('bird');

var seconds = 0;

if (localStorage.hasOwnProperty('highScore') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScore', 0);  //create one and set it to 0
}

highScoreDisplay.innerHTML = localStorage.getItem('highScore'); //display the stored high score


var i = setInterval(function() { //this function repeats once per second, the game will end after 60 seconds
  seconds++; //add one to the total number of seconds
  timer.innerHTML = timer.innerHTML - 1; //take one off the time remaining
  if (seconds === 60) { //if the time is up
    clearInterval(i); //stop the interval
    $('#targetDiv1').remove(); //remove these elements
    $('#targetDiv2').remove();
    $('#targetDiv3').remove();
    $('#scoreDisplay').remove();
    $('#redFlash').remove();
    $('#reload').remove();
    $('#menuButton').remove();
    $('#remaining').remove();
    $('#bird').remove();
    var newHeading = document.createElement("h1"); //create a new heading that tells you time is up
    newHeading.style.textAlign = "center";
    if (scoreCount.innerHTML > parseInt(localStorage.getItem('highScore'))) {
      newHeading.innerHTML = "Time is up! You set a new highscore: "+parseInt(scoreCount.innerHTML);
      $('#highScoreDisplay').remove();
    } else {
      newHeading.innerHTML = "Time is up! Final score: "+parseInt(scoreCount.innerHTML);
    }
    var newButton = document.createElement("button"); //create buttons to try again or return to the menu
    newButton.style.textAlign = "center";
    newButton.innerHTML = "Try Again";
    var newButton2 = document.createElement("button");
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
    if (scoreCount.innerHTML > parseInt(localStorage.getItem('highScore'))) { //if a new high score was achieved
      localStorage.setItem('highScore', parseInt(scoreCount.innerHTML)); //change the high score
      highScoreDisplay.innerHTML = parseInt(localStorage.getItem('highScore'));
    }
  }
}, 1000);


reload.addEventListener('click', function() { //reload button
  ammoCount.innerHTML = "Reloading...";
  setTimeout(function(){ ammoCount.innerHTML = 8;}, 2000); //Takes 2 seconds to reload
});

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
  box.style.visibility = "hidden"; //the target are hidden to start with
  var size = randomNum3();
  box.style.height = size + "px"; //the size of the targets is random
  box.style.width = size + "px";
  setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1; ;}, randomNum()); //targets will appear after a random time interval
  setTimeout(function(){ box.style.opacity = 0; setTimeout(function(){box.style.visibility = "hidden";},500);}, 5000); //targets will disappear after a few seconds if they are not clicked
  box.addEventListener('click', function() { //when a target is clicked
    if (ammoCount.innerHTML > 0) { //if there is enough ammo
      box.style.opacity = 0; //hide the target
      box.style.visibility = "hidden";
      scoreCount.innerHTML = eval(parseInt(scoreCount.innerHTML) + 1); //add one to the player's score
      setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum()); //the target will reappear after a random time interval
      setTimeout(function(){ box.style.opacity = 0; setTimeout(function(){box.style.visibility = "hidden";},500);}, 5000);
      }
  });
  }

var logic = setInterval(function() { //this function speeds up the pace of the game towards the end of the time limit
  for(let box of targets){
    box.style.visibility = "hidden";
    function randomNum() { //random number generator for the time targets take to appear/reappear
      return(Math.floor(Math.random() * 10000) + 500); //number is between 1000 and 10000
    }
    setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum() * 2);
    setTimeout(function(){ box.style.opacity = 0; setTimeout(function(){box.style.visibility = "hidden";},500);}, 7000);
    box.addEventListener('click', function() {
      if (ammoCount.innerHTML > 0) {
        box.style.opacity = 0;
        box.style.visibility = "hidden";
        setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum() * 2);
        setTimeout(function(){ box.style.opacity = 0; setTimeout(function(){box.style.visibility = "hidden";},500);}, 7000);
      } else {

      }
  });
  }
}, randomNum2());

setInterval(function() { //this function makes a bird fly across the screen
  birdControl.style.opacity = 1;
  birdControl.style.marginLeft = "730px"
  setTimeout(function(){ birdControl.style.opacity = 0; },8000);
  setTimeout(function(){ birdControl.style.marginLeft = 0; },8000);

}, randomNum4());

birdControl.addEventListener('click', function() {
if (ammoCount.innerHTML > 0) {
  birdControl.style.opacity = 0;
  birdControl.style.marginLeft = 0
  scoreCount.innerHTML = (parseInt(scoreCount.innerHTML) + 5);
}
});
