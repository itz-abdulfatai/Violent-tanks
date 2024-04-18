function game() {
  let bullets = [];
let score = 0;
let enemies = [];
const game = document.querySelector(".game");
let enemySpeed = 1;
let enemySpawnDelay = 2000;
let gameOver = false;
let playerSpeed = 10;
let defaultPlayerSpeed = 3;
// const PlayerArea = document.querySelector(".player-area");
let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
// dont forget to call this in game proces
function checkGameOver() {
  if (gameOver) {
    // code for when game is over
    clearInterval(gameProcess);
    clearInterval(spawnEnemyProcess);
    clearInterval(clearBulletsProcess)
    clearInterval(increaseSpeedProcess);
    clearInterval(interval);
    game.remove();
    document.querySelector("main").innerHTML = `

    <div class="game-over">
        <h2>Game Over</h2>
        <div class="final-score">your score was <span class="final-score">${score}</span></div>
        <div class="restart-div"><button class="restart-btn btn-primary">Restart</button>

  </div>
    </div>
    
    
    
    `;

        // <button class="home-btn btn-primary">Home</button>


    document.querySelector('.restart-btn').addEventListener('click', () => {
        location.reload()
    });

  //   document.querySelector('.home-btn').addEventListener('click', () => {
  //     location.href = 'index.html'
  // });


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
    // checkGameOver();
    // checkEnemyPosition();
    // moveEnemy();
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



// game


const PlayerArea = document.querySelector(".player-area");
// let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;



let player;
let playerElement;

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 100;
    playerElement = document.createElement("img");
    this.pos = 100;
  }

  draw() {
    player = new Player(this.x, this.y);
    playerElement.classList.add("player");
    playerElement.style.height = `${this.height}px`;
    playerElement.style.width = `${this.width}px`;
    playerElement.style.position = "absolute";
    playerElement.style.top = `${this.y}px`;
    playerElement.style.left = `${this.x}px`;
    playerElement.src = "assets/player-sprite.png";
    playerElement.style.objectFit = "cover";

    PlayerArea.appendChild(playerElement);
  }

  move() {
    document.body.addEventListener("keydown", () => {
      if (event.key == "ArrowRight") {
        if (this.pos < PlayerArea.offsetWidth - (this.width + 35)) {
          playerElement.style.left = `${(this.x += 20)}px`;
          this.pos += 20;
          // console.log(this.pos);
        }
      } else if (event.key == "ArrowLeft") {
        if (this.pos > 20) {
          playerElement.style.left = `${(this.x -= 20)}px`;
          this.pos -= 20;
          // console.log(this.pos);
        }
      }
    });
  }
}


player = new Player(100, -35);
player.draw();
player.move();

setInterval(() => {
  checkBulletPosition();
}, 1000 / 60);


function updateHighestScore() {
  // console.log((highestScore))
  if (score > highestScore) {
    console.log("high score exeeded");
    highestScore = score;
    renderHighestScore();
    localStorage.setItem("highestScore", highestScore);
  } else if (score < highestScore) {
    renderHighestScore();
  }
}

function renderHighestScore() {
  const highestScoreDisplay = document.querySelector(".highest-score");
  highestScoreDisplay.innerHTML = highestScore;
}

// set interval
setInterval(() => {
  updateHighestScore();
}, 1000);


// enemy


class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 50;
    this.element = document.createElement("img");
    this.src = `assets/enemy-sprite-${Math.floor(Math.random() * 6)}.png`;
    this.id = `enemy-${Math.floor(Math.random() * 999)}-${Math.floor(
      Math.random() * 999
    )}`;
    this.zIndex = 90;
  }

  draw() {
    const enemy = this.element;
    enemy.classList.add("enemy");
    enemy.style.height = `${this.height}px`;
    enemy.style.width = `${this.width}px`;
    enemy.style.position = "absolute";
    enemy.style.top = `${this.y}px`;
    enemy.style.left = `${this.x}px`;
    enemy.src = this.src;
    enemy.style.objectFit = "cover";
    game.appendChild(enemy);
    enemy.style.zIndex = this.zIndex;
    enemy.dataset.enemyId = this.id;
  }
}



function spawnEnemy() {
  const enemy = new Enemy(Math.floor(Math.random() * (game.offsetWidth - 60)), 1);
  enemy.draw();
  enemies.push(enemy);
}

function moveEnemy() {
  enemies.forEach((enemy) => {
    //  enemy speed can be changed in globals.js
    enemy.y += enemySpeed;
    enemy.draw();
  });
}

function checkEnemyPosition() {
  if (enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const enemyElement = enemy.element;
      const gameHeight = game.getBoundingClientRect().height;

      if (enemy.y > gameHeight - 50) {
        queueFree(enemyElement, enemies, i);
        gameOver = true;

      }
    }
  }
}

function queueFree(element, parent, index) {
    element.classList.add('gone')
    element.remove();

  parent.splice(index, 1);

}



// bullet

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.element = document.createElement("div");
    this.id = `bullet-${Math.floor(Math.random() * 999)}-${Math.floor(
      Math.random() * 999
    )}`;
    this.zIndex = Math.floor(Math.random() * 80);
  }

  draw() {
    const bullet = this.element;
    bullet.classList.add("bullet");
    bullet.classList.add(`bullet-${this.id}`);
    bullet.style.height = `${this.height}px`;
    bullet.style.width = `${this.width}px`;
    bullet.style.position = "absolute";
    bullet.style.bottom = `${this.y}px`;
    bullet.style.left = `${this.x}px`;
    game.appendChild(bullet);
    bullet.style.zIndex = this.zIndex;
    bullet.dataset.bulletId = this.id;
  }
}

function shootBullet() {
  const player = document.querySelector(".player");
  const xPos = player.style.left;
  const xPosNumber = xPos.split("px")[0];
  const bullet = new Bullet(Number(xPosNumber) + 35, 20);
  bullet.draw();
  bullets.push(bullet);
}

function moveBullet() {
  bullets.forEach((bullet) => {
    bullet.y += 10;
    // the 10 here can be variable bullet speed if you would like to change it
    bullet.draw();
  });
}

setInterval(() => {
  moveBullet();
}, 1000 / 60);

// move enemy
let interval;
interval = setInterval(() => {
  if (enemies) {
    moveEnemy();
    checkGameOver();

    checkEnemyPosition();

  }
}, 1000 / 60)






document.body.addEventListener("keydown", () => {
  if (event.key == " " && !gameOver) {
    shootBullet();
  }
});

function checkBulletPosition() {
  if (bullets) {
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      const bulletElement = bullet.element;
      const gameHeight = game.getBoundingClientRect().height;
      if (bullet.y > gameHeight - 50) {
        console.log("game height reached");
        queueFree(bulletElement, bullets, i);
      }
    }
  }
}

function checkForCollision() {
  if (bullets) {
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      const bulletElement = bullet.element;

      const bulletPosition = bulletElement.getBoundingClientRect();
      const bulletPositionX = bulletPosition.x;
      const bulletPositionY = bulletPosition.y;

      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const enemyElement = enemy.element;

        const enemyPosition = enemyElement.getBoundingClientRect();
        const enemyPositionX = enemyPosition.x;
        const enemyPositionY = enemyPosition.y;


        if (
          bulletPosition.x < enemyPosition.x + enemyPosition.width &&
          bulletPosition.x + bulletPosition.width > enemyPosition.x &&
          bulletPosition.y < enemyPosition.y + enemyPosition.height &&
          bulletPosition.y + bulletPosition.height > enemyPosition.y
        ) {
          console.log("enemy shot");
          queueFree(bulletElement, bullets, i);
          queueFree(enemyElement, enemies, i);
          score += 5;
          updateScore();

        }
      }
    }
  }
}


setInterval(() => {
  checkForCollision();
}, 1000 / 20);

function updateScore() {
  const scoreDisplay = document.querySelector(".score");
  scoreDisplay.innerHTML = score;
}

// for residual bullets

function clearBullets() {
  const bulletsOnScreen = document.querySelectorAll(".bullet");

  bulletsOnScreen.forEach((bullet) => {
    const bulletsOnScreenId = bullet.dataset.bulletId;
    let bulletsInArray = [];

    bullets.forEach((bullet) => {
      bulletsInArray.push(bullet.id);
    });

    if (!bulletsInArray.includes(bulletsOnScreenId)) {
      bullet.remove();
    }
  });

}


}

window.addEventListener('load', () => {
  document.querySelector('main').innerHTML = `
  <div class="home">
            <h1 class="title">violent tanks</h1>
            <button  class="btn-primary" onclick="renderGameArea()">Start</button>
        </div>`;

        let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
        const highestScoreDisplay = document.querySelector(".highest-score");
            highestScoreDisplay.innerHTML = highestScore;

        
})

function renderGameArea() {
  document.querySelector('main').innerHTML = `
  <div class="game">
  <div class="player-area"></div>
</div>`;
game()

  
}

