<template>
  <div class="settings-window">
    <BaseInput
      v-for="(setting, key) in settings"
      :key="key"
      :title="setting.title"
      :subtitle="setting.subtitle"
    >
      <input
        v-bind="setting.attributes"
        :value="getInputValue(setting.storeValue)"
        @input="setInputValue($event, setting.storeValue, setting.storeAction, setting.attributes.type)"
      />
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from "../../components/inputs/BaseInput.vue";
import { mapState, mapActions } from "vuex";
import mapComputeds from "../../logic/mapComputeds";

export default {
  name: "BackgroundSettings",
  components: {
    BaseInput
  },
  data: () => ({}),
  methods: {
    ...mapActions("background", [
      "changeOverlayOpacity",
      "changePlayOnMidi"
    ]),
    getInputValue(name) {
      return this[name];
    },
    setInputValue(e, name, action, type) {
      let payloadValue = e.target.value;
      if (type === "number") payloadValue = e.target.valueAsNumber;
      if(type === "checkbox") payloadValue = event.target.checked;
      action({
        [name]: payloadValue
      });
    }
  },
  computed: {
    ...mapState("background", [
      "overlayOpacity",
      "playOnMidi"
    ]),
    settings() {
      return [
        {
          title: "Video Overlay Opacity",
          subtitle: "Between 0-1",
          storeValue: "overlayOpacity",
          storeAction: this.changeOverlayOpacity,
          attributes: {
            type: "number",
            min: 0,
            max: 1,
            step: 0.1
          }
        },
        {
          title: "Play on MIDI",
          subtitle: "Plays video on first MIDI input",
          storeValue: "playOnMidi",
          storeAction: this.changePlayOnMidi,
          attributes: {
            type: "checkbox",
            checked: this.playOnMidi
          }
        },
      ];
    }
  }
};
</script>

<style scoped lang='scss'>
</style>