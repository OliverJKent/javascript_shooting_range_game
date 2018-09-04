function randomNum() { //random number generator for the time targets take to appear/reappear
  return(Math.floor(Math.random() * 10000) + 1000); //number is between 1000 and 10000
}

function randomNum2() {
  return(Math.floor(Math.random() * 35000) + 25000); //number is between 25000 and 35000
}

var targets = document.getElementsByClassName('targets');
var scoreCount = document.getElementById('score');
var ammoCount = document.getElementById('ammo');
var clickArea = document.getElementsByClassName('gameArea')[0];
var reload = document.getElementById('reload');
var flash = document.getElementById('redFlash');
var timer = document.getElementById('countdown');
var highScoreDisplay = document.getElementById('highestScore');

var seconds = 0;

highScoreDisplay.innerHTML = localStorage.getItem('highScore'); //display the stored high score

var i = setInterval(function() { //game ends after 60 second timer
  seconds++;
  timer.innerHTML = timer.innerHTML - 1;
  if (seconds === 60) {
    clearInterval(i);
    $('#targetDiv1').remove();
    $('#targetDiv2').remove();
    $('#targetDiv3').remove();
    $('#scoreDisplay').remove();
    $('#redFlash').remove();
    $('#reload').remove();
    $('#menuButton').remove();
    $('#remaining').remove();
    var newHeading = document.createElement("h1");
    newHeading.style.textAlign = "center";
    newHeading.innerHTML = "Time is up! Final score: "+parseInt(scoreCount.innerHTML);
    var newButton = document.createElement("button");
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
    if (scoreCount.innerHTML > parseInt(localStorage.getItem('highScore'))) {
      localStorage.setItem('highScore', parseInt(scoreCount.innerHTML));
      highScoreDisplay.innerHTML = parseInt(localStorage.getItem('highScore'));
    }
  }
}, 1000);

// var space = event.keyCode;
// if (x == 32) {
//   ammoCount.innerHTML = "Reloading...";
//   setTimeout(function(){ ammoCount.innerHTML = 8;}, 2000);
//     }


reload.addEventListener('click', function() { //reload button
  ammoCount.innerHTML = "Reloading...";
  setTimeout(function(){ ammoCount.innerHTML = 8;}, 2000); //Takes 2 seconds to reload
});

clickArea.addEventListener('click', function() { //deplete ammo when clicking in game area
  if (ammoCount.innerHTML > 0) {
  ammoCount.innerHTML = parseInt(ammoCount.innerHTML - 1);
} else {
    flash.style.color = "red";
    setTimeout(function(){ flash.style.color = "black";}, 300);


}
});


for(let box of targets){ //target logic
  box.style.visibility = "hidden";
  setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum());
  setTimeout(function(){ box.style.visibility = "hidden"; box.style.opacity = 0;}, 5000);
  box.addEventListener('click', function() {
    if (ammoCount.innerHTML > 0) {
      box.style.opacity = 0;
      box.style.visibility = "hidden";
      scoreCount.innerHTML = eval(parseInt(scoreCount.innerHTML) + 1);
      setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum());
      setTimeout(function(){ box.style.visibility = "hidden"; box.style.opacity = 0;}, 5000);
      }
  });
  }

var logic = setInterval(function() {
  for(let box of targets){
    box.style.visibility = "hidden";
    setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum() * 2);
    setTimeout(function(){ box.style.visibility = "hidden"; box.style.opacity = 0;}, 7000);
    box.addEventListener('click', function() {
      if (ammoCount.innerHTML > 0) {
        box.style.opacity = 0;
        box.style.visibility = "hidden";
        setTimeout(function(){ box.style.visibility = "visible"; box.style.opacity = 1;}, randomNum() * 2);
        setTimeout(function(){ box.style.visibility = "hidden"; box.style.opacity = 0;}, 7000);
      } else {

      }
  });
  }
}, randomNum2());
