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
      Current URL: {{storeUrl}}
    </div>
    <div class="input">
      Play on MIDI input?
      <input type="checkbox" v-model="playOnMidi">
    </div>
    <div class="input">
      Change Background Video:
      <br>
      <ValidationProvider rules="required|youtubeUrl" name="url" v-slot="{errors, valid}">
        <input type="text" v-model="localUrl" ref="urlInput" @keyup.enter="changeVideo">
        <button :disabled="!valid" @click="changeVideo">submit</button>
        <span> {{ errors[0] }} </span>
      </ValidationProvider>
    </div>
  </modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import mapComputeds from "../logic/mapComputeds";

export default {
  name: "OptionsMenu",
  data: () => ({
    localUrl: ''
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
    ...mapActions("background", [
      "changeUrl",
      "changePlayOnMidi"
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
    },
    changeVideo() {
      // https://www.youtube.com/watch?v=DtzpGKadgew
      this.changeUrl({
        url: this.localUrl
      })
      this.localUrl = "";
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
    ...mapState("background", {
      storeUrl: 'url'
    }),
    //two way computed for updating store w/ v-model
    ...mapComputeds([
      'particleColor',
      'octaves',
      'baseOctave',
      'opacity',
      'naturalsColor',
      'accidentalsColor',
      'height',
      'visible',
      'colorMode',
      'playOnMidi'
      ])
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