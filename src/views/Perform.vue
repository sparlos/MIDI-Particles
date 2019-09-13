<template>
  <div class="perform">
    <Background ref="background" />
    <canvas ref="canvas"></canvas>
    <OptionsMenu @resetParticles="resetParticles" />
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
import Background from "../components/Background.vue";
import OptionsMenu from "../components/OptionsMenu.vue";
import ParticleSystem from "../logic/ParticleSystem";
import Stats from "stats.js";
import { mapState, mapActions, mapGetters } from "vuex";

let previousTime = 0;

export default {
  name: "Perform",
  components: {
    Keyboard,
    OptionsMenu,
    Background
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
    stats: new Stats()
  }),
  methods: {
    //canvas methods
    canvasSetup() {
      //resize canvas on window resize
      window.addEventListener("resize", () => {
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
      if (!this.videoPlaying && this.playOnMidi) {
        this.$refs.background.player.playVideo();
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
        case "o":
          this.showModal();
          break;

        default:
          break;
      }
    },
    //settings methods
    showModal() {
      for (let note in this.activeNotes) {
        this.handleDeactivateNote(note);
      }
      this.$modal.show("options");
    }
  },
  computed: {
    ...mapState({
      particleColor: state => state.keyboard.particleColor,
      baseOctave: state => state.keyboard.baseOctave,
      colorMode: state => state.keyboard.colorMode,
      videoPlaying: state => state.background.videoPlaying,
      playOnMidi: state => state.background.playOnMidi
    }),
    ...mapGetters("keyboard", {
      keyboardLength: "length",
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
    this.setupShortcuts();

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
</style>