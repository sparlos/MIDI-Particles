<template>
  <div class="settings-window">
    <BaseInput
      v-for="(setting, key) in activeSettings"
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
        @input="setInputValue($event, setting.storeValue, setting.storeAction, setting.attributes.type, setting.validation)"
      />
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from "../../components/BaseInput.vue";
import { mapState, mapActions } from "vuex";
import mapComputeds from "../../logic/mapComputeds";

export default {
  name: "ParticleSettings",
  components: {
    BaseInput
  },
  data: () => ({
    localUrl: ""
  }),
  methods: {
    ...mapActions("keyboard", [
      "changeColorMode",
      "changeParticleColor",
      "changeParticleGradient"
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
    ...mapState("keyboard", [
      "colorMode",
      "particleColor",
      "particleGradient"
    ]),
    activeSettings() {
      return this.settings.filter((setting) => {
        if(setting.visible) {
          return setting.visible === this.colorMode;
        }
        return true;
        });
    },
    settings() {
      return [
        {
          title: "Particle Type",
          subtitle: "Single color or gradient",
          storeValue: "colorMode",
          storeAction: this.changeColorMode,
          multi: true,
          options: ["solid", "gradient"],
          attributes: {}
        },
        {
          title: "Color",
          subtitle: "Changes color of particles",
          storeValue: "particleColor",
          storeAction: this.changeParticleColor,
          visible: 'solid',
          attributes: {
            type: "color"
          }
        }
      ];
    }
  },
  mounted() {
    this.localUrl = this.url;
  }
};
</script>

<style scoped lang='scss'>
input[type="text"] {
  width: 250px;
}
</style>