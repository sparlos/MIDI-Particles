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
  name: "KeyboardSettings",
  components: {
    BaseInput
  },
  data: () => ({
    
  }),
  methods: {
    ...mapActions("keyboard", ["changeOctaves", "changeBaseOctave"]),
    ...mapActions("view", ["changeView"]),
    getInputValue(name) {
      return this[name];
    },
    setInputValue(e, name, action, type) {
      let payloadValue = e.target.value;
      if(type === 'number') payloadValue = e.target.valueAsNumber;
      action({
        [name]: payloadValue
      });
    },
    handleKeyup(e) {
      switch(e.key) {
        case "Escape":
          this.changeView({
            view: 'perform'
          })
          break;
      }
    }
  },
  computed: {
    ...mapState("keyboard", {
      octaves: "octaves",
      baseOctave: "baseOctave"
    }),
    ...mapState("view", {
      view: "view"
    }),
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
        }
      ];
    }
  },
  mounted() {
    document.addEventListener("keyup", this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.handleKeyup);
  }
};
</script>

<style scoped lang='scss'>
</style>