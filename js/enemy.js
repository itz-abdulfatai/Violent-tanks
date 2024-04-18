let enemies = [];
const game = document.querySelector(".game");
let enemySpeed = 1;
let gameOver = false;

// i moved the game variable from here

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 50;
    this.element = document.createElement("img");
    this.src = `assets/enemy-sprite-${Math.floor(Math.random() * 7)}.png`;
    this.id = `enemy-${Math.floor(Math.random() * 999)}-${Math.floor(
      Math.random() * 999
    )}`;
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
    enemy.dataset.enemyId = this.id;
  }
}

// const enemy = new Enemy((Math.floor(Math.random() * game.offsetWidth))-this.width, 1);

// enemy.draw();

function spawnEnemy() {
  const enemy = new Enemy(Math.floor(Math.random() * game.offsetWidth), 1);
  enemy.draw();
  enemies.push(enemy);
}

function moveEnemy() {
  enemies.forEach((enemy) => {
    enemy.y += enemySpeed;
    //  the 50 here can be var enemy speed
    enemy.draw();
    // console.log(enemy)
  });
}

function checkEnemyPosition() {
  if (enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const enemyElement = enemy.element;
      const gameHeight = game.getBoundingClientRect().height;

      if (enemy.y > gameHeight - 50) {
        // console.log('enemy reached below')
        // enemies.splice(i, 1);
        // enemyElement.remove();
        queueFree(enemyElement, enemies, i);
        gameOver = true;

      }
    }
  }
}

function queueFree(element, parent, index) {
  parent.splice(index, 1);
  element.remove();
}

// this will be executed using physics process
setInterval(() => {
  checkEnemyPosition();
}, 1000 / 60);

// funtions to iterate using framerate
// 1 move enemy

setInterval(() => {
  moveEnemy();
}, 1000 / 10);

// test for enemy spawn and motion

setInterval(() => {
  spawnEnemy();
}, 3000);

// increase enemy speed with time
setInterval(() => {
  enemySpeed += 0.5;
}, 5000);
