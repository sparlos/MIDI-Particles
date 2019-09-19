<template>
  <div>
    <BaseInput title="Reset All Settings" subtitle="If unexpected behaviour is happening, try this">
      <button @click="promptResetModal">Reset</button>
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from "../../components/BaseInput.vue";

export default {
  name: "AdvancedSettings",
  components: {
    BaseInput
  },
  methods: {
    promptResetModal() {
      this.$modal.show("dialog", {
        title: `Reset All Settings?`,
        text: `This will reset all settings to their default value on page refresh.`,
        buttons: [
          {
            title: "RESET",
            handler: this.resetSettings,
            default: true
          },
          {
            title: "CLOSE"
          }
        ]
      });
    },
    resetSettings() {
      localStorage.clear();
      this.$modal.hide("dialog");
      this.$toasted.show(
        `All settings reset. Refresh page to complete.`,
        {
          duration: 3000,
          position: "bottom-center",
          action: {
            text: "close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        }
      );
    }
  }
};
</script>

<style scoped lang='scss'>
</style>