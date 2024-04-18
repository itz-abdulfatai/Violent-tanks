const PlayerArea = document.querySelector(".player-area");
let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;

// const playerAreaPos = PlayerArea.getBoundingClientRect().y;
// console.log(playerAreaPos);

// const x = (PlayerArea.offsetWidth / 2) / 2;
// console.log(x)

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
    // playerElement.offsetTop = this.y;
    // playerElement.offsetWidth = this.x;
    playerElement.style.height = `${this.height}px`;
    playerElement.style.width = `${this.width}px`;
    // playerElement.style.backgroundColor = "#f03562";
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

// create play on load

// these will be called when screen load
player = new Player(100, -35);
player.draw();
player.move();
// console.log(bullets);

// this will be executed using physics process
setInterval(() => {
  checkBulletPosition();
}, 1000 / 60);

// console.log(game.getBoundingClientRect());

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
