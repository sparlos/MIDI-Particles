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
      keyboard opacity:
      <input type="number" min="0.1" max="1" step="0.1" v-model.number="opacity" />
    </div>
  </modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "OptionsMenu",
  methods: {
    ...mapActions("keyboard", [
      "changeParticleColor",
      "setState",
      "changeOctaves",
      "changeBaseOctave",
      "changeOpacity",
      "changeNaturalsColor"
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
      storeNaturalsColor: "naturalsColor"
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