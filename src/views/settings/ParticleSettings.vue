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
    ...mapActions("particles", [
      "changeMode",
      "changeColor",
      "changeGradientStart",
      "changeGradientEnd",
      "changeMinSize",
      "changeMaxSize"
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
    ...mapState("particles", [
      "mode",
      "color",
      "gradientStart",
      "gradientEnd",
      "minSize",
      "maxSize"
    ]),
    activeSettings() {
      return this.settings.filter((setting) => {
        if(setting.visible) {
          return setting.visible === this.mode;
        }
        return true;
        });
    },
    settings() {
      return [
        {
          title: "Particle Type",
          subtitle: "Single color or gradient",
          storeValue: "mode",
          storeAction: this.changeMode,
          multi: true,
          options: ["solid", "gradient"],
          attributes: {}
        },
        {
          title: "Color",
          subtitle: "Changes color of particles",
          storeValue: "color",
          storeAction: this.changeColor,
          visible: 'solid',
          attributes: {
            type: "color"
          }
        },
        {
          title: "Gradient Start",
          subtitle: "Changes color of the start of the gradient",
          storeValue: "gradientStart",
          storeAction: this.changeGradientStart,
          visible: 'gradient',
          attributes: {
            type: "color"
          }
        },
        {
          title: "Gradient End",
          subtitle: "Changes color of the end of the gradient",
          storeValue: "gradientEnd",
          storeAction: this.changeGradientEnd,
          visible: 'gradient',
          attributes: {
            type: "color"
          }
        },
        {
          title: "Minimum Size",
          subtitle: "Between 1-100",
          storeValue: "minSize",
          storeAction: this.changeMinSize,
          attributes: {
            type: "number",
            min: "1",
            max: "100"
          }
        },
        {
          title: "Maximum Size",
          subtitle: "Between 1-100",
          storeValue: "maxSize",
          storeAction: this.changeMaxSize,
          attributes: {
            type: "number",
            min: "1",
            max: "100"
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