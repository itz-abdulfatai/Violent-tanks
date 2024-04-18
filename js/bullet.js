// class Bullet {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 5;
//     this.height = 10;
//     this.element = document.createElement("div");
//     this.id = `bullet-${Math.floor(Math.random() * 999)}-${Math.floor(
//       Math.random() * 999
//     )}`;
//     this.zIndex = Math.floor(Math.random() * 80);
//   }

//   draw() {
//     const bullet = this.element;
//     bullet.classList.add("bullet");
//     bullet.classList.add(`bullet-${this.id}`);
//     bullet.style.height = `${this.height}px`;
//     bullet.style.width = `${this.width}px`;
//     bullet.style.position = "absolute";
//     bullet.style.bottom = `${this.y}px`;
//     bullet.style.left = `${this.x}px`;
//     game.appendChild(bullet);
//     bullet.style.zIndex = this.zIndex;
//     bullet.dataset.bulletId = this.id;
//   }
// }

// function shootBullet() {
//   const player = document.querySelector(".player");
//   const xPos = player.style.left;
//   const xPosNumber = xPos.split("px")[0];
//   const bullet = new Bullet(Number(xPosNumber) + 35, 20);
//   bullet.draw();
//   bullets.push(bullet);
// }

// function moveBullet() {
//   bullets.forEach((bullet) => {
//     bullet.y += 10;
//     // the 10 here can be variable bullet speed if you would like to change it
//     bullet.draw();
//   });
// }

// setInterval(() => {
//   moveBullet();
// }, 1000 / 60);



// document.body.addEventListener("keydown", () => {
//   if (event.key == " " && !gameOver) {
//     shootBullet();
//   }
// });

// function checkBulletPosition() {
//   if (bullets) {
//     for (let i = 0; i < bullets.length; i++) {
//       const bullet = bullets[i];
//       const bulletElement = bullet.element;
//       const gameHeight = game.getBoundingClientRect().height;
//       if (bullet.y > gameHeight - 50) {
//         console.log("game height reached");
//         queueFree(bulletElement, bullets, i);
//       }
//     }
//   }
// }

// function checkForCollision() {
//   if (bullets) {
//     for (let i = 0; i < bullets.length; i++) {
//       const bullet = bullets[i];
//       const bulletElement = bullet.element;

//       const bulletPosition = bulletElement.getBoundingClientRect();
//       const bulletPositionX = bulletPosition.x;
//       const bulletPositionY = bulletPosition.y;

//       for (let i = 0; i < enemies.length; i++) {
//         const enemy = enemies[i];
//         const enemyElement = enemy.element;

//         const enemyPosition = enemyElement.getBoundingClientRect();
//         const enemyPositionX = enemyPosition.x;
//         const enemyPositionY = enemyPosition.y;


//         if (
//           bulletPosition.x < enemyPosition.x + enemyPosition.width &&
//           bulletPosition.x + bulletPosition.width > enemyPosition.x &&
//           bulletPosition.y < enemyPosition.y + enemyPosition.height &&
//           bulletPosition.y + bulletPosition.height > enemyPosition.y
//         ) {
//           console.log("enemy very close");
//           queueFree(bulletElement, bullets, i);
//           queueFree(enemyElement, enemies, i);
//           score += 5;
//           updateScore();

//         }
//       }
//     }
//   }
// }


// setInterval(() => {
//   checkForCollision();
// }, 1000 / 20);

// function updateScore() {
//   const scoreDisplay = document.querySelector(".score");
//   scoreDisplay.innerHTML = score;
// }

// // for residual bullets

// function clearBullets() {
//   const bulletsOnScreen = document.querySelectorAll(".bullet");

//   bulletsOnScreen.forEach((bullet) => {
//     const bulletsOnScreenId = bullet.dataset.bulletId;
//     let bulletsInArray = [];

//     bullets.forEach((bullet) => {
//       bulletsInArray.push(bullet.id);
//     });

//     if (!bulletsInArray.includes(bulletsOnScreenId)) {
//       bullet.remove();
//     }
//   });

// }
