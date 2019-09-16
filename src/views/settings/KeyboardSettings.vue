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
import BaseInput from "../../components/BaseInput.vue";
import { mapState, mapActions } from "vuex";
import mapComputeds from "../../logic/mapComputeds";

export default {
  name: "KeyboardSettings",
  components: {
    BaseInput
  },
  data: () => ({}),
  methods: {
    ...mapActions("keyboard", [
      "changeOctaves",
      "changeBaseOctave",
      "changeNaturalsColor",
      "changeAccidentalsColor",
      "changeOpacity",
      "changeHeight",
      "changeVisible"
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
    ...mapState("keyboard", [
      "octaves",
      "baseOctave",
      "naturalsColor",
      "accidentalsColor",
      "opacity",
      "height",
      "visible"
    ]),
    settings() {
      return [
        {
          title: "Octave Range",
          subtitle: "Between 1-8",
          storeValue: "octaves",
          storeAction: this.changeOctaves,
          attributes: {
            type: "number",
            min: 1,
            max: 8
          }
        },
        {
          title: "Base Octave",
          subtitle: "Between 0-5",
          storeValue: "baseOctave",
          storeAction: this.changeBaseOctave,
          attributes: {
            type: "number",
            min: 0,
            max: 5
          }
        },
        {
          title: "Naturals Color",
          subtitle: "(these are usually white on a piano)",
          storeValue: "naturalsColor",
          storeAction: this.changeNaturalsColor,
          attributes: {
            type: "color"
          }
        },
        {
          title: "Accidentals Color",
          subtitle: "(these are usually black on a piano)",
          storeValue: "accidentalsColor",
          storeAction: this.changeAccidentalsColor,
          attributes: {
            type: "color"
          }
        },
        {
          title: "Keyboard Height",
          subtitle: "Between 0-500",
          storeValue: "height",
          storeAction: this.changeHeight,
          attributes: {
            type: "number",
            min: "0",
            max: "500",
            step: "10"
          }
        },
        {
          title: "Keyboard Visible",
          subtitle: "(Particles will remain visible)",
          storeValue: "visible",
          storeAction: this.changeVisible,
          attributes: {
            type: "checkbox",
            checked: this.visible
          }
        }
      ];
    }
  }
};
</script>

<style scoped lang='scss'>
</style>