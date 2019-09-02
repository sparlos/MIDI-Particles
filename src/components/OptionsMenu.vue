<template>
  <modal name="options" @opened="modalOpened" @closed="modalClosed">
    octave range:
    <input type="number" min="1" max="8" v-model.number="octaves">
    base  octave:
    <input type="number" min="1" max="5">
    color:
    <input type="color" v-model="color">
  </modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

  export default {
    name: 'OptionsMenu',
    methods: {
      ...mapActions('keyboard', {
        changeColor: 'changeColor',
        setState: 'setState',
        changeOctaves: 'changeOctaves'
      }),
      modalOpened() {
        this.setState({
          disabled: true
        })
      },
      modalClosed() {
        this.setState({
          disabled: false
        })
      }
    },
    computed: {
      ...mapState('keyboard', {
        storeColor: 'color',
        storeOctaves: 'octaves',
        storeBaseOctave: 'baseOctave'
      }),
      ...mapState('background', {
        
      }),
      color: {
        get() {
          return this.storeColor;
        },
        set(value) {
          this.changeColor({
            color: newValue
          })
        }
      },
      octaves: {
        get() {
          return this.storeOctaves;
        },
        set(value) {
          this.changeOctaves({
            octaves: value
          })
        }
      }
    },
    updated() {
      this.$emit('resetParticles');
    }
  }
</script>

<style lang="scss" scoped>

</style>