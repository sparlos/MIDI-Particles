<template>
  <modal name="options">
    <input type="color" v-model="color">
  </modal>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    name: 'OptionsMenu',
    methods: {
      ...mapActions('keyboard', {
        changeColor: 'changeColor'
      })
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
    }
  }
</script>

<style lang="scss" scoped>

</style>