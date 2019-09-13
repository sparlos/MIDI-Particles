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
        @input="setInputValue($event, setting.storeValue, setting.storeAction)"
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
    getInputValue(name) {
      return this[name];
    },
    setInputValue(e, name, action) {
      action({
        [name]: e.target.value
      });
    },
    handleKeyup(e) {
      switch(e.key) {
        case "Escape":
          console.log('change back to perform view');
          break;
      }
    }
  },
  computed: {
    ...mapState("keyboard", {
      octaves: "octaves",
      baseOctave: "baseOctave"
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
  }
};
</script>

<style scoped lang='scss'>
</style>