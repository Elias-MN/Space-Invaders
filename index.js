// Imports
import { Bullet } from "./class/bullet.js";
import { Enemy } from "./class/enemy.js";
import { setCustomProperty } from "./class/updateProperties.js";

// Referencias al DOM
const gameContainerElement = document.getElementById("game-container");
const player = document.getElementById("player");

// Variables
let style;
let playerWidth, playerPositionX, playerPositionY;
let startBulletPosition = 15;
let lastTime;
let cooldown = false;
let bulletsInWindow = [];
let enemiesInWindow = [];
let enemiesMax = 5;
let enemyPositionX, enemyPositionY;
let enemyWidth = 15;
let enemyHeight = 15;
let bulletWidth = 3;
let bulletHeight = 5;
let moveLeft = true;
let moveDown = false;
let lastUpdateTime = 0;
const frameRate = 60; //FPS

//Eventos
window.addEventListener('keydown', actionPlayer);

//Este método actualiza la pantalla
window.requestAnimationFrame(update);

startGame();

//Funciones

function update(time) {
  let deltaTime = time - lastUpdateTime;
  if (deltaTime > 1000 / frameRate) {

    bulletsInWindow.forEach(bullet => {
      bullet.updateBullet();
      enemiesInWindow.forEach(enemy => {
        if (bullet.checkCollision(enemy)) {
          enemy.destroy();
        }
      });
    });

    enemiesInWindow.forEach(enemy => {
      enemy.updateEnemy(moveLeft, moveDown);
    });

    lastUpdateTime = time;
  }
  window.requestAnimationFrame(update);

}

function startGame() {
  getPlayer();

  enemyPositionX = 50;
  enemyPositionY = 325;

  for (let enemies = 1; enemies <= enemiesMax; enemies++) {
    let enemy = new Enemy(enemyPositionX, enemyPositionY, enemyWidth, enemyHeight);
    enemiesInWindow.push(enemy);
    gameContainerElement.appendChild(enemy.getElement());
    enemyPositionX += 65;
  }

  //Movimiento de izquierda a derecha de los enemigos
  setInterval(() => {
    moveLeft = !moveLeft;
    moveDown = !moveDown;
  }, 2000);

}

function getPlayer() {
  style = window.getComputedStyle(player);
  playerPositionX = parseInt(style.getPropertyValue('left'));
  playerPositionY = parseInt(style.getPropertyValue('bottom'));
  playerWidth = parseInt(style.getPropertyValue('width'));
}

function actionPlayer(event) {
  style = window.getComputedStyle(player);
  playerPositionX = parseInt(style.getPropertyValue('left'));

  switch (event.key) {

    case "ArrowLeft":
      player.style.left = playerPositionX - 10 + "px";
      break;

    case "ArrowRight":
      player.style.left = playerPositionX + 10 + "px";
      break;

    case "Control":
      if (cooldown == false) {
        shoot();
        cooldown = true;
        setTimeout(() => {
          cooldown = false;
          bulletsInWindow.pop();
        }, 1500);
      }
      break;
  }
}

function shoot() {

  let bulletPositionX = parseInt(playerPositionX + (playerWidth / 2));
  let bulletPositionY = parseInt(playerPositionY + startBulletPosition);

  let bullet = new Bullet(bulletPositionX, bulletPositionY, bulletWidth, bulletHeight);
  bulletsInWindow.push(bullet);
  gameContainerElement.appendChild(bullet.getElement());

}



