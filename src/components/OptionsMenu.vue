<template>
  <modal name="options" @opened="modalOpened" @closed="modalClosed">
    octave range:
    <input type="number" min="1" max="8" v-model.number="octaves" />
    base octave:
    <input type="number" min="1" max="5" v-model.number="baseOctave" />
    color:
    <input type="color" v-model="color" />
  </modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "OptionsMenu",
  methods: {
    ...mapActions("keyboard", {
      changeColor: "changeColor",
      setState: "setState",
      changeOctaves: "changeOctaves",
      changeBaseOctave: "changeBaseOctave"
    }),
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
      storeColor: "color",
      storeOctaves: "octaves",
      storeBaseOctave: "baseOctave"
    }),
    ...mapState("background", {}),
    //two way computed for updating store w/ v-model
    color: {
      get() {
        return this.storeColor;
      },
      set(value) {
        this.changeColor({
          color: value
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
    }
  },
  updated() {
    this.$emit("resetParticles");
  }
};
</script>

<style lang="scss" scoped>
</style>