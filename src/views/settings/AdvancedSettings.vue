<template>
  <div>

    <BaseInput title="Reset All Settings" subtitle="If unexpected behaviour is happening, try this">
      <button @click="promptResetModal">Reset</button>
    </BaseInput>

    <BaseInput title="Open MIDI Troubleshooter" subtitle="If you're experiencing issues with MIDI input">
      <button @click="promptDebugModal">Open</button>
    </BaseInput>

     <!-- debug midi modal -->
    <modal name="debug-midi">
      <DebugMIDI />
    </modal>
  </div>
</template>

<script>
import BaseInput from "../../components/BaseInput.vue";
import DebugMIDI from "../../components/DebugMIDI.vue";
import defaultSettings from "../../logic/defaultSettings";

//low db
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

export default {
  name: "AdvancedSettings",
  components: {
    BaseInput,
    DebugMIDI
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
    promptDebugModal() {
      this.$modal.show("debug-midi");
    },
    resetSettings() {
      for(let setting in defaultSettings) {
        let settingOptions = defaultSettings[setting];
        for(let option in settingOptions) {
          db.set(`${setting}.${option}`, defaultSettings[setting][option]).write();
        }
      }
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