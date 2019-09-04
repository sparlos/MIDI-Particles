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
      particle color mode:
      <input type="radio" id="color-mode-solid" value="solid" v-model="colorMode">
      <label for="color-mode-solid">solid</label>
      <input type="radio" id="color-mode-gradient" value="gradient" v-model="colorMode">
      <label for="color-mode-gradient">gradient</label>
    </div>
    <div class="input" v-if="colorMode === 'solid'">
      particle color:
      <input type="color" v-model="particleColor" />
    </div>
    <div class="input" v-if="colorMode === 'gradient'">
      first stop:
      <input type="color" :value="storeParticleGradient[0]" @input="handleGradientChange($event, 0)">
      second stop:
      <input type="color" :value="storeParticleGradient[1]" @input="handleGradientChange($event, 1)">
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
    <div class="input">
      <ValidationProvider rules="secret" v-slot="{errors}">
        <input type="text" v-model="email">
        <span> {{ errors[0] }} </span>
      </ValidationProvider>
    </div>
  </modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "OptionsMenu",
  data: () => ({
    email: ''
  }),
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
      "changeVisible",
      "changeColorMode",
      "changeParticleGradient"
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
    },
    handleGradientChange(e, i) {
      let color = e.target.value;
      this.changeParticleGradient({
        index: i,
        color: color
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
      storeVisible: "visible",
      storeColorMode: "colorMode",
      storeParticleGradient: "particleGradient"
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
    },
    colorMode: {
      get() {
        return this.storeColorMode
      },
      set(value) {
        this.changeColorMode({
          colorMode: value
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