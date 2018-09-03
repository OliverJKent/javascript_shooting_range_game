function randomNum() {
  return(Math.floor(Math.random() * 10000) + 1000);
}

var targets = document.getElementsByClassName('targets');
var scoreCount = document.getElementById('score');
var ammoCount = document.getElementById('ammo');
var clickArea = document.getElementsByClassName('gameArea')[0];
var reload = document.getElementById('reload');
var timer = document.getElementById('countdown');

var intervals = 0

var i = setInterval(function() {
  intervals++;
  timer.innerHTML = timer.innerHTML - 1;
  if (intervals === 60) {
    clearInterval(i);
    // clickArea.innerHTML = "Time is up Your score is "(scoreCount.innerHTML);
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
    console.log("No ammo");
}

});



// var logic = setInterval(function() {
  for(let box of targets){
    box.style.visibility = "hidden";
    setTimeout(function(){ box.style.visibility = "visible";}, randomNum());
    setTimeout(function(){ box.style.visibility = "hidden";}, 5000);
    box.addEventListener('click', function() {
      if (ammoCount.innerHTML > 0) {
        box.style.visibility = "hidden";
        scoreCount.innerHTML = eval(parseInt(scoreCount.innerHTML) + 1);
        setTimeout(function(){ box.style.visibility = "visible";}, randomNum());
        setTimeout(function(){ box.style.visibility = "hidden";}, 5000);
      } else {

      }
  });
  }
// }, 1000);

var logic = setInterval(function() {
  for(let box of targets){
    box.style.visibility = "hidden";
    setTimeout(function(){ box.style.visibility = "visible";}, randomNum() * 2);
    setTimeout(function(){ box.style.visibility = "hidden";}, 7000);
    box.addEventListener('click', function() {
      if (ammoCount.innerHTML > 0) {
        box.style.visibility = "hidden";
        setTimeout(function(){ box.style.visibility = "visible";}, randomNum() * 2);
        setTimeout(function(){ box.style.visibility = "hidden";}, 7000);
      } else {

      }
  });
  }
}, 30000);

function movingTarget() {
    var elem = document.getElementById("myAnimation");
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}
