import { GameObject } from "./gameObject.js";
import { setCustomProperty } from "./updateProperties.js";

export class Bullet extends GameObject {
  bulletElement;
  velocity = 5;
  timeLife = 1500;

  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.setElement();
  }

  setElement() {
    this.bulletElement = document.createElement("div");
    this.bulletElement.classList.add("bullet");
    //Posicionamos la bala justo en la mitad del jugador, un poco por encima suya
    setCustomProperty(this.bulletElement, "left", this.x + "px");
    setCustomProperty(this.bulletElement, "bottom", this.y + "px");
    //Tiempo que durará la bala en el DOM
    setTimeout(() => {
      this.bulletElement.remove();
    }, this.timeLife);
  }

  getElement() {
    return this.bulletElement;
  }

  updateBullet() {
    this.y += this.velocity;
    setCustomProperty(this.bulletElement, "bottom", this.y + "px");
  }

}
