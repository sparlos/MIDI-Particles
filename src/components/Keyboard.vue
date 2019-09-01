<template>
  <div class="keyboard">
    <div class="octave" v-for="octave in octaves" :key="octave">
      <div class="key__white" v-for="n in 7" :key="n" ref="white">
        <div class="key__white-highlight"></div>
        <div class="key__black" v-if="accidentalIndicies.includes(n)" ref="black">
          <div class="key__black-highlight"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  props: {
    octaves: Number
  },
  data: () => ({
    accidentalIndicies: [1, 2, 4, 5, 6]
  }),
  methods: {
    createMidiIO() {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(this.handleMidiAccess);
      } else {
        //handle browser with no midi access
      }
    },
    handleMidiAccess(access) {
      for (let input of access.inputs.values()) {
        input.onmidimessage = this.handleMidiMessage;
      }
    },
    handleMidiMessage(message) {
      let [value, note, velocity] = message.data;
      const NOTE_ON = 144;
      const NOTE_OFF = 128;
      if (value === NOTE_ON && note) {
        this.activateNote(note, velocity);
      } else if (value === NOTE_OFF && note) {
        this.deactivateNote(note);
      }
    },
    activateNote(note, velocity) {
      if(!this.disabled) this.$emit("activateNote", note, velocity);
    },
    deactivateNote(note) {
      if(!this.disabled) this.$emit("deactivateNote", note);
    }
  },
  computed: {
    disabled() {
      return this.$store.state.keyboard.disabled;
    }
  },
  updated() {
    this.$emit("updateRefs", this.$refs.white, this.$refs.black);
  },
  mounted() {
    this.createMidiIO();
    this.$emit("updateRefs", this.$refs.white, this.$refs.black);
  }
};
</script>

<style scoped lang='scss'>
.keyboard {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 150px;
  display: flex;
}

.octave {
  flex: 1 1 auto;
  display: flex;
}

.key {
  &__white {
    border: 1px solid black;
    flex: 1 1 auto;
    background-color: white;
    position: relative;

    &-highlight {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.1s;
    }
  }

  &__black {
    position: absolute;
    width: 40%;
    height: 70%;
    top: 0;
    left: calc(100% - 40% / 2);
    z-index: 20;
    background-color: black;

    &-highlight {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 30;
      background-color: rgba(255, 255, 255, 0.2);
      opacity: 0;
      transition: opacity 0.1s;
    }
  }
}
</style>