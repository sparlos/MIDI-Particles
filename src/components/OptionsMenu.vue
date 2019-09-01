<template>
  <modal name="options" @opened="modalOpened" @closed="modalClosed">
    <input type="color" v-model="color">
  </modal>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    name: 'OptionsMenu',
    methods: {
      ...mapActions('keyboard', {
        changeColor: 'changeColor',
        setState: 'setState'
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
      color: {
        get() {
          return this.$store.state.keyboard.color;
        },
        set(newValue) {
          this.changeColor({
            color: newValue
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