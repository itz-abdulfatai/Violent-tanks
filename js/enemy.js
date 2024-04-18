
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
    //  tenemy speed can be changed in globals.js
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
