<template>
  <div class="perform">
    <!-- browsers with no midi support -->
    <div class="no-midi" v-if="!midiSupport">
      <div class="no-midi__text">Sorry, your browser does not support MIDI!</div>
      <a
        class="no-midi__link"
        href="https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess#Browser_compatibility"
        target="_blank"
      >Please check out this table to see what browsers are supported.</a>
    </div>
    <!-- tooltip -->
    <ModeTooltip v-if="mode === 'transform'"/>
    <canvas ref="canvas"></canvas>
    <Keyboard
      @updateRefs="handleUpdateRefs"
      @activateNote="handleActivateNote"
      @deactivateNote="handleDeactivateNote"
      ref="keyboard"
    />
  </div>
</template>

<script>
import Keyboard from "../components/Keyboard.vue";
import ParticleSystem from "../logic/ParticleSystem";
import ModeTooltip from "../components/ModeTooltip";
import Stats from "stats.js";
import { mapState, mapActions, mapGetters } from "vuex";

let previousTime = 0;

export default {
  name: "Perform",
  components: {
    Keyboard,
    ModeTooltip
  },
  props: {
    player: Object
  },
  data: () => ({
    ctx: null,
    animationFrame: null,
    whiteKeys: null,
    blackKeys: null,
    activeNotes: {},
    //particle data
    particleCooldown: false,
    previousParticleTime: 0,
    particleSystems: [],
    stats: new Stats(),
    mode: "play"
  }),
  methods: {
    ...mapActions("view", ["changeView"]),
    //canvas methods
    canvasSetup() {
      //resize canvas on window resize
      window.addEventListener("resize", () => {
        this.resetParticles();
        this.resizeCanvas();
      });
    },
    resizeCanvas() {
      this.$refs.canvas.width = window.innerWidth;
      this.$refs.canvas.height = window.innerHeight;
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
          if (this.colorMode === "gradient") {
            if (this.midiAssignments[noteNumber]) {
              let position = this.midiAssignments[noteNumber].position;
              let color = this.gradientArray[position];
              this.createParticleSystem(noteNumber, color, note.velocity);
            }
          } else if (this.colorMode === "solid") {
            this.createParticleSystem(
              noteNumber,
              this.particleColor,
              note.velocity
            );
          }
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

      this.animationFrame = requestAnimationFrame(time => this.loop(time));
    },
    run() {
      this.loop();
    },

    //particle methods
    createParticleSystem(number, color, strength) {
      //calculate position
      let assignment = this.midiAssignments[number];

      //stop function if key not visible
      if (!assignment) return;

      let el = assignment.el;

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
      //deal with play video on first midi input
      if (!this.videoPlaying && this.playOnMidi && this.player) {
        this.player.playVideo();
      }

      if (!this.activeNotes[note]) {
        this.$set(this.activeNotes, note, {});
      }

      let activeNote = this.activeNotes[note];

      this.$set(activeNote, "on", true);
      this.$set(activeNote, "velocity", velocity);

      if (this.midiAssignments[note]) {
        let el = this.midiAssignments[note].el;
        el.children[0].style.opacity = 1;
      }
    },
    handleDeactivateNote(note) {
      this.activeNotes[note].on = false;
      this.activeNotes[note].velocity = 0;

      if (this.midiAssignments[note]) {
        let el = this.midiAssignments[note].el;
        el.children[0].style.opacity = 0;
      }
    },
    //shortcut methods
    setupShortcuts() {
      document.addEventListener("keyup", this.addListeners);
    },
    addListeners(e) {
      switch (e.key) {
        case "Escape":
          this.changeView({
            view: "settings"
          });
          this.$toasted.clear();
          break;
        case "t":
          this.mode === "play"
            ? (this.mode = "transform")
            : (this.mode = "play");
          break;

        default:
          break;
      }
    }
  },
  computed: {
    ...mapState({
      particleColor: state => state.particles.color,
      baseOctave: state => state.keyboard.baseOctave,
      colorMode: state => state.particles.mode,
      videoPlaying: state => state.background.videoPlaying,
      playOnMidi: state => state.background.playOnMidi,
      midiSupport: state => state.view.midiSupport
    }),
    ...mapGetters("keyboard", {
      keyboardLength: "keyLength"
    }),
    ...mapGetters("particles", {
      gradientArray: "gradientArray"
    }),
    midiAssignments() {
      //for translating keys to midi values
      const WHITE_KEY_MAP = [0, 2, 4, 5, 7, 9, 11];
      const BLACK_KEY_MAP = [1, 3, 6, 8, 10];

      let mappedElements = {};
      let baseOctave = this.baseOctave * 12;

      for (let i = 0; i < this.whiteKeys.length; i++) {
        let octave = Math.floor(i / 7) * 12 + baseOctave;
        let midiValue = WHITE_KEY_MAP[i % 7] + octave;
        mappedElements[midiValue] = {};
        mappedElements[midiValue].el = this.whiteKeys[i];
        mappedElements[midiValue].position = midiValue - baseOctave;
      }

      for (let i = 0; i < this.blackKeys.length; i++) {
        let octave = Math.floor(i / 5) * 12 + baseOctave;
        let midiValue = BLACK_KEY_MAP[i % 5] + octave;
        mappedElements[midiValue] = {};
        mappedElements[midiValue].el = this.blackKeys[i];
        mappedElements[midiValue].position = midiValue - baseOctave;
      }

      return mappedElements;
    }
  },
  mounted() {
    this.resizeCanvas();
    this.canvasSetup();
    this.ctx = this.$refs.canvas.getContext("2d");
    this.run();
    if (this.midiSupport) {
      this.setupShortcuts();
    }

    //stats js stuff
    // this.stats.showPanel(0);
    // document.body.appendChild(this.stats.dom);
  },
  beforeDestroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    document.removeEventListener("keyup", this.addListeners);
  }
};
</script>

<style lang="scss" scoped>
.no-midi {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  text-align: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: 100000000;
  background-color: white;

  &__text {
    flex: 0 1 100%;
    font-size: 4rem;
    padding: 0 4rem;
    margin: 60px 0;
  }

  &__link {
    flex: 0 1 100%;
    padding: 0 4rem;
    font-size: 1.3rem;
  }
}
</style>