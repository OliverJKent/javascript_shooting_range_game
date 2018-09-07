function randomNum() { //random number generator for the time targets take to appear/reappear
  return(Math.floor(Math.random() * 10000) + 500); //number is between 1000 and 10000
}

function randomNum2() { //random number generator for the size of the targets
  return(Math.floor(Math.random() * 50) + 25); //number is between 100 and 25
}

var targets = document.getElementsByClassName('targets'); //these variables will allow the HTML to be edited later
var scoreCount = document.getElementById('score');
var ammoCount = document.getElementById('ammo');
var clickArea = document.getElementsByClassName('gameArea')[0];
var flash = document.getElementById('redFlash');
var timer = document.getElementById('countdown');
var highScoreDisplay = document.getElementById('highestScore');
var birdControl = document.getElementById('bird');

if (localStorage.hasOwnProperty('highScoreList1') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScoreList1', 0);  //create one and set it to 0
}

if (localStorage.hasOwnProperty('highScoreList2') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScoreList2', 0);  //create one and set it to 0
}

if (localStorage.hasOwnProperty('highScoreList3') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScoreList3', 0);  //create one and set it to 0
}

if (localStorage.hasOwnProperty('highScoreList4') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScoreList4', 0);  //create one and set it to 0
}

if (localStorage.hasOwnProperty('highScoreList5') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScoreList5', 0);  //create one and set it to 0
}

highScoreDisplay.innerHTML = localStorage.getItem('highScoreList1'); //display the stored high score

var seconds = 0;
var i = setInterval(function() { //this function repeats once per second, the game will end after 60 seconds
  seconds++; //add one to the total number of seconds
  timer.innerHTML = timer.innerHTML - 1; //take one off the time remaining
  if (seconds === 30) { //if the time is up
    clearInterval(i); //stop the interval
    $('#targetDiv1').remove(); //remove these elements
    $('#targetDiv2').remove();
    $('#targetDiv3').remove();
    $('#scoreDisplay').remove();
    $('#redFlash').remove();
    $('#reload').remove();
    $('#menuButton').remove();
    $('#remaining').remove();
    var newHeading = document.createElement("h1"); //create a new heading that tells you time is up
    newHeading.style.textAlign = "center";
    if (parseInt(scoreCount.innerHTML) > localStorage.getItem('highScoreList1')) {
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
    if (parseInt(scoreCount.innerHTML) >= localStorage.getItem('highScoreList5') && parseInt(scoreCount.innerHTML) <= localStorage.getItem('highScoreList4')) {
        localStorage.setItem('highScoreList5', scoreCount.innerHTML);
    } else if (parseInt(scoreCount.innerHTML) >= localStorage.getItem('highScoreList4') && parseInt(scoreCount.innerHTML) <= localStorage.getItem('highScoreList3')) {
        localStorage.setItem('highScoreList5',localStorage.getItem('highScoreList4'));
        localStorage.setItem('highScoreList4', parseInt(scoreCount.innerHTML));
    } else if (parseInt(scoreCount.innerHTML) >= localStorage.getItem('highScoreList3') && parseInt(scoreCount.innerHTML) <= localStorage.getItem('highScoreList2')) {
        localStorage.setItem('highScoreList5',localStorage.getItem('highScoreList4'));
        localStorage.setItem('highScoreList4',localStorage.getItem('highScoreList3'));
        localStorage.setItem('highScoreList3', parseInt(scoreCount.innerHTML));
    } else if (parseInt(scoreCount.innerHTML) >= localStorage.getItem('highScoreList2') && parseInt(scoreCount.innerHTML) <= localStorage.getItem('highScoreList1')) {
        localStorage.setItem('highScoreList5',localStorage.getItem('highScoreList4'));
        localStorage.setItem('highScoreList4',localStorage.getItem('highScoreList3'));
        localStorage.setItem('highScoreList3',localStorage.getItem('highScoreList2'));
        localStorage.setItem('highScoreList2', scoreCount.innerHTML);
    } else if (parseInt(scoreCount.innerHTML) >= localStorage.getItem('highScoreList1'))  {
        localStorage.setItem('highScoreList5',localStorage.getItem('highScoreList4'));
        localStorage.setItem('highScoreList4',localStorage.getItem('highScoreList3'));
        localStorage.setItem('highScoreList3',localStorage.getItem('highScoreList2'));
        localStorage.setItem('highScoreList2',localStorage.getItem('highScoreList1'));
        localStorage.setItem('highScoreList1', scoreCount.innerHTML);
        highScoreDisplay.innerHTML = parseInt(localStorage.getItem('highScoreList1'));
    }
    }

}, 1000);

window.addEventListener("keyup", dealWithKeyboard, false);

function dealWithKeyboard(e) {
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
  box.style.visibility = "hidden"; //the target are hidden to start with
  var size = randomNum2();
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

setTimeout(function() { //this function makes a bird fly across the screen
  birdControl.style.opacity = 1;
  birdControl.style.marginLeft = "730px"
  setTimeout(function(){ birdControl.style.opacity = 0; },8000);
  // setTimeout(function(){ birdControl.style.marginLeft = 0; },8000);

}, 10000);

birdControl.addEventListener('click', function() {
if (ammoCount.innerHTML > 0) {
  scoreCount.innerHTML = eval(parseInt(scoreCount.innerHTML) + 1);
  birdControl.style.opacity = 0;
  birdControl.style.marginLeft = 0;
  scoreCount.innerHTML = (parseInt(scoreCount.innerHTML) + 5);
}
});
