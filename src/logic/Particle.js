export default class Particle {
  constructor(x, y, size, strength, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.strength = strength;
    this.color = color;

    //change strength if it's too low
    this.strength < 10 ? this.strength = 10 : null;

    this.dy = .3 * (this.strength/65);
    this.dx = (this.randomRange(-.05, .05)) * (this.strength/70);
    this.drag = this.strength * 0.00000125;

    this.currentAlpha = 1;
    this.fadeSpeed = .1;
    this.currentLife = 0;
    this.lifespan = this.randomRange(2000,4000);
    this.active = false;
  }

  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  changeStrength(strength) {
    this.strength = strength;
    //change strength if it's too low
    this.strength < 10 ? this.strength = 10 : null;
    this.drag = this.strength * 0.0000015;

    this.dy = .3 * (this.strength/65);
    this.dx = (this.randomRange(-.05, .05)) * (this.strength/70);
  }
}