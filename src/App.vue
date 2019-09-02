<template>
  <div id="app">
    <div class="container">
      <Background />
      <canvas ref="canvas"></canvas>
      <OptionsMenu @resetParticles="resetParticles" />
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
import Background from "./components/Background.vue";
import OptionsMenu from "./components/OptionsMenu.vue";
import ParticleSystem from "./logic/ParticleSystem";
import Stats from "stats.js";
import { mapState, mapActions } from "vuex";

let previousTime = 0;

export default {
  name: "app",
  components: {
    Keyboard,
    OptionsMenu,
    Background
  },
  data: () => ({
    octaves: 4,
    octave: 3,
    ctx: null,
    whiteKeys: null,
    blackKeys: null,
    activeNotes: {},
    //particle data
    particleCooldown: false,
    previousParticleTime: 0,
    particleSystems: [],
    stats: new Stats()
  }),
  methods: {
    ...mapActions("keyboard", {
      changeColor: "changeColor"
    }),
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

      let deltaTime = time - previousTime;
      if (isNaN(deltaTime)) deltaTime = 0;
      previousTime = time;

      this.resetCanvas();

      //loop over active notes and create particles
      for (let noteNumber in this.activeNotes) {
        let note = this.activeNotes[noteNumber];
        if (note.on && !note.system) {
          this.createParticleSystem(noteNumber, this.color, note.velocity);
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
    resetParticles() {
      this.activeNotes = {};
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
    },
    //shortcut methods
    setupShortcuts() {
      document.addEventListener("keyup", e => {
        switch (e.key) {
          case "o":
            this.showModal();
            break;

          default:
            break;
        }
      });
    },
    //settings methods
    showModal() {
      for(let note in this.activeNotes) {
        this.handleDeactivateNote(note);
      }
      this.$modal.show("options");
    }
  },
  computed: {
    ...mapState({
      color: state => state.keyboard.color
    }),
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
    this.setupShortcuts();

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

#app {
  overflow: hidden;
}

.container {
  width: 100vw;
  min-height: 100vh;
}
</style>
