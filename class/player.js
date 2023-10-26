import { GameObject } from "./gameObject.js";
import { setCustomProperty } from "./updateProperties.js";

export class Player extends GameObject {

  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.setElement();
  }

  setElement() { }

}
