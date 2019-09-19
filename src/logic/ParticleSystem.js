import Particle from "./Particle";
import hexToRgba from "hex-to-rgba";

export default class ParticleSystem {
  constructor(x, y, color, strength, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.strength = strength;
    this.size = size;

    this.cooldown = false;
    this.cooldownTime = 0;
    this.maxCooldown = 50;

    this.currentParticle = 0;
    this.particles = [];
    this.maxParticles = 100;
    this.queueStrengthChange = false;

    this.active = true;
    this.toBeDestroyed = false;

    this.createParticles();
  }

  // createParticle() {
  //   if (this.particles.length < this.maxParticles && this.active) {
  //     this.particles.push(new Particle(this.x, this.y, this.randomRange(2, 5), this.strength, this.color));
  //   }
  // }

  createParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(
        new Particle(
          this.x,
          this.y,
          this.randomRange(this.size.min, this.size.max),
          this.strength,
          this.color
        )
      );
    }
  }

  loopParticles() {
    if (this.active) {
      let particle = this.particles[this.currentParticle];
      if (particle.strength !== this.strength) {
        particle.changeStrength(this.strength);
      }
      particle.active = true;
      if (this.currentParticle >= this.maxParticles - 1) {
        this.currentParticle = 0;
      } else {
        this.currentParticle++;
      }
    }
  }

  destroy() {
    this.toBeDestroyed = true;
  }

  draw(ctx, delta) {
    //cooldown stuff
    if (!this.cooldown) {
      // this.createParticle();
      this.loopParticles();
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

      if (particle.active) {
        //animate particle
        particle.y -= particle.dy * delta;
        particle.x += particle.dx * delta;
        ctx.fillStyle = particle.color;
        //glow stuff
        // ctx.shadowColor = this.color;
        // ctx.shadowBlur = 10;

        //fade out stuff
        if (particle.currentLife >= particle.lifespan - 1000) {
          particle.currentAlpha -= particle.fadeSpeed;
          ctx.fillStyle = hexToRgba(particle.color, particle.currentAlpha);
          if (particle.currentAlpha <= 0) particle.currentAlpha = 0;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
          ctx.fill();
        }

        //remove particle if it has reached the end of its lifespan
        particle.currentLife += delta;
        if (particle.currentLife >= particle.lifespan) {
          // this.particles.splice(i, 1);
          particle.active = false;
          particle.x = this.x;
          particle.y = this.y;
          particle.currentLife = 0;
          particle.currentAlpha = 1;
        }
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
