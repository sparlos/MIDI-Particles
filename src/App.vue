<template>
  <div id="app">
    <div class="container" @click="playVideo">
      <div class="background">
        <div class="background__overlay"></div>
        <youtube video-id="bZNFRIwlQxQ" width="100%" height="100%" ref="youtube"></youtube>
      </div>
      <canvas ref="canvas"></canvas>
      <Keyboard
        :octaves="octaves"
        @updateRefs="handleUpdateRefs"
        @activateNote="handleActivateNote"
        @deactivateNote="handleDeactivateNote"
        ref="keyboard"
      />
    </div>
  </div>
</template>

<script>
import Keyboard from "./components/Keyboard.vue";
import ParticleSystem from "./logic/ParticleSystem";
import Stats from "stats.js";

export default {
  name: "app",
  components: {
    Keyboard
  },
  data: () => ({
    octaves: 4,
    octave: 3,
    ctx: null,
    whiteKeys: null,
    blackKeys: null,
    activeNotes: {},
    previousTime: 0,
    //particle data
    particleCooldown: false,
    previousParticleTime: 0,
    particleColor: "#d16aff",
    particleSystems: [],
    stats: new Stats()
  }),
  methods: {
    //video methods
    playVideo() {
      this.$refs.youtube.player.playVideo();
      this.$refs.youtube.player.mute();
    },
    //canvas methods
    canvasSetup() {
      //resize canvas on window resize
      window.addEventListener("resize", () => {
        this.resizeCanvas();
      });
    },
    resizeCanvas() {
      this.$refs.canvas.width = window.innerWidth;
      this.$refs.canvas.height =
        window.innerHeight -
        this.$refs.keyboard.$el.getBoundingClientRect().height;
    },
    resetCanvas() {
      // this.ctx.globalAlpha = .5;
      // this.ctx.fillStyle = "black";
      this.ctx.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      // this.ctx.globalAlpha = 1;
    },
    //animation methods
    loop(time) {
      this.stats.begin();

      let deltaTime = time - this.previousTime;
      if (isNaN(deltaTime)) deltaTime = 0;
      this.previousTime = time;

      this.resetCanvas();

      // ===== implement again when you have particle systems in place =====

      //deal with particle cooldown
      // this.previousParticleTime += deltaTime;

      // if(this.particleCooldown && this.previousParticleTime >= 1) {
      //   this.previousParticleTime = 0;
      //   this.particleCooldown = false;
      // }

      //loop over active notes and create particles
      for (let noteNumber in this.activeNotes) {
        let note = this.activeNotes[noteNumber];
        if (note.on && !note.system) {
          this.createParticleSystem(noteNumber, this.particleColor, note.velocity);
        } else if (!note.on && note.system) {
          note.system.active = false;
          if (note.system.toBeDestroyed) note.system = null;
        } else if (note.on && note.system) {
          note.system.active = true;
          note.system.strength = note.velocity;
        }
      }

      //loop over particle systems and render them
      for (let i in this.particleSystems) {
        let particleSystem = this.particleSystems[i];
        particleSystem.draw(this.ctx, deltaTime);
        if (particleSystem.toBeDestroyed) {
          this.particleSystems.splice(i, 1);
        }
      }

      // //loop over particles and render them
      // for (let i in this.particleSystems) {
      //   let particle = this.particleSystems[i];

      //   //animate particle
      //   particle.y -= particle.dy;
      //   particle.x += particle.dx;
      //   this.ctx.fillStyle = this.particleColor;
      //   //glow stuff
      //   this.ctx.shadowColor = this.particleColor;
      //   this.ctx.shadowBlur = 10;

      //   if (particle.currentLife >= particle.lifespan - 1000) {
      //     this.ctx.globalAlpha = particle.currentAlpha;
      //     particle.currentAlpha -= particle.fadeSpeed;
      //     if (particle.currentAlpha <= 0) particle.currentAlpha = 0;
      //     this.ctx.fillRect(particle.x, particle.y, 3, 3);
      //     this.ctx.globalAlpha = 1;
      //   } else {
      //     this.ctx.fillRect(particle.x, particle.y, 3, 3);
      //   }

      //   //remove particle if it has reached the end of its lifespan
      //   particle.currentLife += deltaTime;
      //   if (particle.currentLife >= particle.lifespan) {
      //     this.particleSystems.splice(i, 1);
      //   }
      // }

      this.$forceUpdate();

      this.stats.end();

      requestAnimationFrame(time => this.loop(time));
    },
    run() {
      this.loop();
    },

    //particle methods
    createParticleSystem(number, color, strength) {
      //calculate position
      let el = this.midiAssignments[number];

      //stop function if key not visible
      if (!el) return;

      let rect = el.getBoundingClientRect();
      let center = Math.floor(rect.left + rect.width / 2);
      let top = rect.top;

      //add particles
      let system = new ParticleSystem(center, top, color, strength);
      this.activeNotes[number].system = system;
      this.particleSystems.push(system);

      // debug
      // this.ctx.fillStyle = "red";
      // this.ctx.fillRect(center, top - 100, 100, 100);
    },

    //MIDI IO methods
    handleUpdateRefs(white, black) {
      this.whiteKeys = white;
      this.blackKeys = black;
    },
    handleActivateNote(note, velocity) {
      if (!this.activeNotes[note]) {
        this.$set(this.activeNotes, note, {});
      }

      this.$set(this.activeNotes[note], "on", true);
      this.$set(this.activeNotes[note], "velocity", velocity);

      if (this.midiAssignments[note]) {
        let el = this.midiAssignments[note];
        el.children[0].style.opacity = 1;
      }
    },
    handleDeactivateNote(note) {
      this.activeNotes[note].on = false;
      this.activeNotes[note].velocity = 0;

      if (this.midiAssignments[note]) {
        let el = this.midiAssignments[note];
        el.children[0].style.opacity = 0;
      }
    }
  },
  computed: {
    midiAssignments() {
      //for translating keys to midi values
      const WHITE_KEY_MAP = [0, 2, 4, 5, 7, 9, 11];
      const BLACK_KEY_MAP = [1, 3, 6, 8, 10];

      let mappedElements = {};
      let baseOctave = this.octave * 12;

      for (let i = 0; i < this.whiteKeys.length; i++) {
        let octave = Math.floor(i / 7) * 12 + baseOctave;
        let midiValue = WHITE_KEY_MAP[i % 7] + octave;
        mappedElements[midiValue] = this.whiteKeys[i];
      }

      for (let i = 0; i < this.blackKeys.length; i++) {
        let octave = Math.floor(i / 5) * 12 + baseOctave;
        let midiValue = BLACK_KEY_MAP[i % 5] + octave;
        mappedElements[midiValue] = this.blackKeys[i];
      }

      return mappedElements;
    }
  },
  mounted() {
    this.resizeCanvas();
    this.canvasSetup();
    this.ctx = this.$refs.canvas.getContext("2d");
    this.run();

    //stats js stuff
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100vw;
  min-height: 100vh;
}

.background {
  position: absolute;
  z-index: -10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  & iframe {
    z-index: -12;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
