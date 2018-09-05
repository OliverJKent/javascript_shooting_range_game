if (localStorage.hasOwnProperty('highScore') === false) { //If local storage for the high score has not been created
  localStorage.setItem('highScore', 0);  //create one and set it to 0
}

var highScoreDisplay = document.getElementById('highestScore');

highScoreDisplay.innerHTML = parseInt(localStorage.getItem('highScore'));
