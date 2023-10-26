import { GameObject } from "./gameObject.js";
import { setCustomProperty, getCustomProperty } from "./updateProperties.js";

export class Enemy extends GameObject {
  enemyElement;
  velocity = 0.5;
  maxMovement = 300;
  moveDownOnce = false;

  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.setElement();
  }

  setElement() {
    this.enemyElement = document.createElement("div");
    this.enemyElement.classList.add("enemy");
    setCustomProperty(this.enemyElement, "left", this.x + "px");
    setCustomProperty(this.enemyElement, "bottom", this.y + "px");
  }

  getElement() {
    return this.enemyElement;
  }

  move(moveLeft, moveDown) {

    if (moveDown != this.moveDownOnce) {
      this.y -= 10;
      this.moveDownOnce = !this.moveDownOnce;
    }

    if (moveLeft) {
      this.x += this.velocity;
    } else {
      this.x -= this.velocity;
    }
    setCustomProperty(this.enemyElement, "left", this.x + "px");
    setCustomProperty(this.enemyElement, "bottom", this.y + "px");

  }

  destroy() {
    this.enemyElement.remove();
  }

  updateEnemy(moveLeft, moveDown) {
    this.move(moveLeft, moveDown);
  }

}
