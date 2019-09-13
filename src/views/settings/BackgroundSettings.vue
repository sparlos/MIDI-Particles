<template>
  <div class="settings-window">
    <BaseInput 
      title="Octave Range"
      subtitle="Between 1-8"
    >
      <input type="number">
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from "../../components/inputs/BaseInput.vue"

export default {
  name: 'BackgroundSettings',
  components: {
    BaseInput
  },
  computed: {
    settings: ()=> ([
      {
        title: 'Octave Range',
        subtitle: "Between 1-8",
        value: null
      }
    ])
  }
}

</script>

<style scoped lang='scss'>
</style>