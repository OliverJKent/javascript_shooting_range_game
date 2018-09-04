var highScoreDisplay = document.getElementById('highestScore');

highScoreDisplay.innerHTML = parseInt(localStorage.getItem('highScore'));
