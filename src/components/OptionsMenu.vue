<template>
  <modal name="options" @opened="modalOpened" @closed="modalClosed">
    <div class="input">
      octave range:
      <input type="number" min="1" max="8" v-model.number="octaves" />
    </div>
    <div class="input">
      base octave:
      <input type="number" min="1" max="5" v-model.number="baseOctave" />
    </div>
    <div class="input">
      particle color:
      <input type="color" v-model="particleColor" />
    </div>
    <div class="input">
      keyboard naturals color:
      <input type="color" v-model="naturalsColor" />
    </div>
    <div class="input">
      keyboard accidentals color:
      <input type="color" v-model="accidentalsColor" />
    </div>
    <div class="input">
      keyboard opacity:
      <input type="number" min="0.1" max="1" step="0.1" v-model.number="opacity" />
    </div>
    <div class="input">
      keyboard height:
      <input type="number" min="0" max="300" step="10" v-model="height">
    </div>
    <div class="input">
      keyboard visible:
      <input type="checkbox" v-model="visible">
    </div>
  </modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "OptionsMenu",
  methods: {
    ...mapActions("keyboard", [
      "changeParticleColor",
      "setState",
      "changeOctaves",
      "changeBaseOctave",
      "changeOpacity",
      "changeNaturalsColor",
      "changeAccidentalsColor",
      "changeHeight",
      "changeVisible"
    ]),
    modalOpened() {
      this.setState({
        disabled: true
      });
    },
    modalClosed() {
      this.setState({
        disabled: false
      });
    }
  },
  computed: {
    ...mapState("keyboard", {
      storeParticleColor: "particleColor",
      storeOctaves: "octaves",
      storeBaseOctave: "baseOctave",
      storeOpacity: "opacity",
      storeNaturalsColor: "naturalsColor",
      storeAccidentalsColor: "accidentalsColor",
      storeHeight: "height",
      storeVisible: "visible"
    }),
    //two way computed for updating store w/ v-model
    particleColor: {
      get() {
        return this.storeParticleColor;
      },
      set(value) {
        this.changeParticleColor({
          particleColor: value
        });
      }
    },
    octaves: {
      get() {
        return this.storeOctaves;
      },
      set(value) {
        this.changeOctaves({
          octaves: value
        });
      }
    },
    baseOctave: {
      get() {
        return this.storeBaseOctave;
      },
      set(value) {
        this.changeBaseOctave({
          baseOctave: value
        });
      }
    },
    opacity: {
      get() {
        return this.storeOpacity;
      },
      set(value) {
        this.changeOpacity({
          opacity: value
        });
      }
    },
    naturalsColor: {
      get() {
        return this.storeNaturalsColor;
      },
      set(value) {
        this.changeNaturalsColor({
          naturalsColor: value
        });
      }
    },
    accidentalsColor: {
      get() {
        return this.storeAccidentalsColor
      },
      set(value) {
        this.changeAccidentalsColor({
          accidentalsColor: value
        })
      }
    },
    height: {
      get() {
        return this.storeHeight
      },
      set(value) {
        this.changeHeight({
          height: value
        })
      }
    },
    visible: {
      get() {
        return this.storeVisible
      },
      set(value) {
        this.changeVisible({
          visible: value
        })
      }
    }
  },
  updated() {
    this.$emit("resetParticles");
  }
};
</script>

<style lang="scss" scoped>
//debug
.input {
  width: 100%;
}
</style>