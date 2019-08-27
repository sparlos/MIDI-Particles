export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = this.randomRange(.5, .75);
    this.dx = this.randomRange(-.25, .25);
    this.currentAlpha = 1;
    this.fadeSpeed = .1;
    this.currentLife = 0;
    this.lifespan = this.randomRange(3000,4000);
  }

  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}