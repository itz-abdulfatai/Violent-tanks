let bullets = [];
let score = 0;
let enemies = [];
const game = document.querySelector(".game");
let enemySpeed = 0.3;
let enemySpawnDelay = 2000;
let gameOver = false;
let playerSpeed = 10;
let defaultPlayerSpeed = 3;
const PlayerArea = document.querySelector(".player-area");
let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
// dont forget to call this in game proces
function checkGameOver() {
  if (gameOver) {
    // code for when game is over
    clearInterval(gameProcess);
    clearInterval(spawnEnemyProcess);
    clearInterval(clearBulletsProcess)
    clearInterval(increaseSpeedProcess);
    game.remove();
    document.querySelector("main").innerHTML = `

    <div class="game-over">
        <h2>Game Over</h2>
        <div class="final-score">your score was <span class="final-score">${score}</span></div>
        <div class="restart-div"><button class="restart-btn btn-primary">Restart</button><button class="home-btn btn-primary">Home</button>
  </div>
    </div>
    
    
    
    `;
    document.querySelector('.restart-btn').addEventListener('click', () => {
        location.reload()
    });

    document.querySelector('.home-btn').addEventListener('click', () => {
      location.href = 'index.html'
  });


  }
}

function updateHighestScore() {
  // console.log((highestScore))
  if (score > highestScore) {
    console.log("high score exeeded");
    highestScore = score;
    renderHighestScore;
    localStorage.setItem("highestScore", highestScore);
  } else if (score < highestScore) {
    renderHighestScore();
  }
}

function renderHighestScore() {
  const highestScoreDisplay = document.querySelector(".highest-score");
  highestScoreDisplay.innerHTML = highestScore;
}

window.addEventListener("load", () => {
  startGame();
});

// this the code that runs the game

let gameProcess;

function startGame() {
  (gameProcess = setInterval(() => {
    checkBulletPosition();
    updateHighestScore();
    checkGameOver();
    checkEnemyPosition();
    moveEnemy();
  })),
    1000 / 10;
}

let spawnEnemyProcess;
let increaseSpeedProcess;
let clearBulletsProcess;

// determines how fast enemies spawn

spawnEnemyProcess = setInterval(() => {
  if (game) {
    spawnEnemy();
  }
}, enemySpawnDelay);

// increase enemy speed with time
increaseSpeedProcess = setInterval(() => {
  if (game) {
    enemySpeed += 0.05;
  }
}, 5000);

clearBulletsProcess = setInterval(() => {
    clearBullets()

}, 1000 / 10)