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
        @keypress="setInputValue($event, setting.storeValue)"
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
    keyToLabel: {
      " " : "Space"
    }
  }),
  methods: {
    ...mapActions("shortcuts", [
      "changeShortcut"
    ]),
    getInputValue(name) {
      if(this[name] === " ") return this.keyToLabel[this[name]];
      return this[name];
    },
    setInputValue(e, name) {
      e.preventDefault();
      this.changeShortcut({
        action: name,
        key: e.key
      });
    }
  },
  computed: {
    ...mapState("shortcuts", [
      "toggleVideo"
    ]),
    settings() {
      return [
        {
          title: "Toggle Video",
          subtitle: "Plays/Pauses the video",
          storeValue: "toggleVideo",
          storeAction: this.changeShortcut,
          attributes: {
            type: "text"
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
  width: 40px;
}
</style>