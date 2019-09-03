<template>
  <modal name="options" @opened="modalOpened" @closed="modalClosed">
    octave range:
    <input type="number" min="1" max="8" v-model.number="octaves" />
    base octave:
    <input type="number" min="1" max="5" v-model.number="baseOctave" />
    particle color:
    <input type="color" v-model="particleColor" />
    opacity:
    <input type="number" min="0.1" max="1" step="0.1" v-model.number="opacity">
  </modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "OptionsMenu",
  methods: {
    ...mapActions("keyboard", [
      'changeParticleColor',
      'setState',
      'changeOctaves',
      'changeBaseOctave',
      'changeOpacity'
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
      storeOpacity: "opacity"
    }),
    ...mapState("background", {}),
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
        return this.storeBaseOctave
      },
      set(value) {
        this.changeBaseOctave({
          baseOctave: value
        })
      }
    },
    opacity: {
      get() {
        return this.storeOpacity
      },
      set(value) {
        this.changeOpacity({
          opacity: value
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
</style>