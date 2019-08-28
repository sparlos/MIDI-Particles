import Particle from "./Particle";

export default class ParticleSystem {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.cooldown = false;
    this.cooldownTime = 0;
    this.maxCooldown = 50;
    this.particles = [];
    this.maxParticles = 100;

    this.active = true;
    this.toBeDestroyed = false;
  }

  createParticle() {
    if (this.particles.length < this.maxParticles && this.active) {
      this.particles.push(new Particle(this.x, this.y, this.randomRange(2, 5)));
    }
  }

  destroy() {
    this.toBeDestroyed = true;
  }

  draw(ctx, delta) {
    //cooldown stuff
    if (!this.cooldown) {
      this.createParticle();
      this.cooldown = true;
    }

    this.cooldownTime += delta;

    if (this.cooldownTime >= this.maxCooldown) {
      this.cooldownTime = 0;
      this.cooldown = false;
    }

    //loop over particles and render them
    for (let i in this.particles) {
      let particle = this.particles[i];

      //animate particle
      particle.y -= (particle.dy) * delta;
      particle.x += (particle.dx) * delta;
      ctx.fillStyle = this.color;
      //glow stuff
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;

      //fade out stuff
      if (particle.currentLife >= particle.lifespan - 1000) {
        ctx.globalAlpha = particle.currentAlpha;
        particle.currentAlpha -= particle.fadeSpeed;
        if (particle.currentAlpha <= 0) particle.currentAlpha = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      } else {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2*Math.PI);
        ctx.fill();
      }

      //remove particle if it has reached the end of its lifespan
      particle.currentLife += delta;
      if (particle.currentLife >= particle.lifespan) {
        this.particles.splice(i, 1);
      }
    }

    //system detruction stuff
    if (this.particles.length === 0) {
      this.destroy();
    }
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
