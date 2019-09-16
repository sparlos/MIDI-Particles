<template>
  <div class="settings-window">
    <BaseInput
      v-for="(setting, key) in settings"
      :key="key"
      :title="setting.title"
      :subtitle="setting.subtitle"
    >
      <select
        name
        id
        v-if="setting.multi"
        :value="getInputValue(setting.storeValue)"
        @input="setInputValue($event, setting.storeValue, setting.storeAction, setting.attributes.type)"
      >
        <option v-for="option in setting.options" :key="option" :value="option">{{option}}</option>
      </select>
      <input
        v-else
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
      "changePlayOnMidi",
      "changeType",
      "changeColor"
    ]),
    getInputValue(name) {
      return this[name];
    },
    setInputValue(e, name, action, type) {
      let payloadValue = e.target.value;
      if (type === "number") payloadValue = e.target.valueAsNumber;
      if (type === "checkbox") payloadValue = event.target.checked;
      action({
        [name]: payloadValue
      });
    }
  },
  computed: {
    ...mapState("background", [
      "overlayOpacity",
      "playOnMidi",
      "type",
      "color"
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
        {
          title: "Background Type",
          subtitle: "Video or solid color background",
          storeValue: "type",
          storeAction: this.changeType,
          multi: true,
          options: ["color", "video"],
          attributes: {}
        },
        {
          title: "Solid Background Color",
          subtitle: "Color of the background when a it's a solid color",
          storeValue: "color",
          storeAction: this.changeColor,
          attributes: {
            type: "color"
          }
        }
      ];
    }
  }
};
</script>

<style scoped lang='scss'>
</style>