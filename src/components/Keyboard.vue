<template>
  <div class="keyboard" :style="keyboardStyle">
    <div class="octave" v-for="octave in octaves" :key="octave">
      <div
        class="key__white"
        v-for="n in 7"
        :key="n"
        ref="white"
        :style="{backgroundColor: naturalsColor}"
      >
        <div class="key__white-highlight"></div>
        <div
          class="key__black"
          v-if="accidentalIndicies.includes(n)"
          :style="{backgroundColor: accidentalsColor}"
          ref="black"
        >
          <div class="key__black-highlight"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Keyboard",
  data: () => ({
    accidentalIndicies: [1, 2, 4, 5, 6],
    access: null
  }),
  methods: {
    ...mapActions("view", ["changeMidiSupport"]),
    ...mapActions("midi", ["connectPort"]),
    createMidiIO() {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(this.handleMidiAccess);
      } else {
        //handle browser with no midi access
        this.changeMidiSupport({ midiSupport: false });
      }
    },
    removeMidiIO() {
      for (let input of this.access.inputs.values()) {
        input.onmidimessage = () => {};
      }
      this.access.onstatechange = () => {};
    },
    handleMidiAccess(access) {
      this.access = access;
      for (let input of access.inputs.values()) {
        input.onmidimessage = this.handleMidiMessage;
      }

      access.onstatechange = e => {
        let port = e.port;

        if (port.state === "connected" && port.type === "input") {
          port.onmidimessage = this.handleMidiMessage;
        } else if (port.state === "disconnected" && port.type === "input") {
          port.onmidimessage = () => {};
        }
      };
    },
    handleMidiMessage(message) {
      if(this.ports[message.target.id] && !this.ports[message.target.id].active) return;
      let [value, note, velocity] = message.data;
      const NOTE_ON = 144;
      const NOTE_OFF = 128;
      if ((value === NOTE_ON && note) && velocity !== 0) {
        this.activateNote(note, velocity);
      } else if (note && (velocity === 0 || value === NOTE_OFF)) {
        this.deactivateNote(note);
      }
    },
    handleMidiDisconnect(port) {},
    activateNote(note, velocity) {
      if (!this.disabled) this.$emit("activateNote", note, velocity);
    },
    deactivateNote(note) {
      if (!this.disabled) this.$emit("deactivateNote", note);
    }
  },
  computed: {
    ...mapState("keyboard", [
      "octaves",
      "opacity",
      "disabled",
      "naturalsColor",
      "accidentalsColor",
      "visible"
    ]),
    ...mapGetters("keyboard", ["heightPixels"]),
    ...mapState("view", ["midiSupport"]),
    ...mapState("midi", ["ports"]),
    keyboardStyle() {
      //change height to 0 if visible is false
      let height = this.visible ? this.heightPixels : "0px";
      return {
        opacity: this.opacity,
        height: height
      };
    }
  },
  updated() {
    this.$emit("updateRefs", this.$refs.white, this.$refs.black);
  },
  mounted() {
    this.createMidiIO();
    this.$emit("updateRefs", this.$refs.white, this.$refs.black);
  },
  beforeDestroy() {
    this.removeMidiIO();
  }
};
</script>

<style scoped lang='scss'>
.keyboard {
  width: 100%;
  position: absolute;
  bottom: 0;
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