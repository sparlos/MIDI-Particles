export default class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dy = this.randomRange(1, 4);
    this.dx = this.randomRange(-.25, .25);
    this.currentAlpha = 1;
    this.fadeSpeed = .1;
    this.currentLife = 0;
    this.lifespan = this.randomRange(2000,4000);
  }

  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}