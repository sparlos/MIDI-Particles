<template>
  <div class="settings-window">
    <div class="devices">
      <div class="devices__heading">Connected Devices:</div>
      <div class="device" v-for="(port, id) in connectedPorts" :key="port.id">
        <div class="device__text">
          <div class="device__title">{{port.name}}</div>
          <div class="device__subtitle">
            active:
            <input
              type="checkbox"
              :checked="getInputValue(id)"
              @input="setInputValue($event, id)"
            />
          </div>
        </div>
        <div class="device__form"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../../components/BaseInput.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import mapComputeds from "../../logic/mapComputeds";

export default {
  name: "MIDISettings",
  components: {
    BaseInput
  },
  data: () => ({}),
  methods: {
    ...mapActions("midi", ["changePortActive"]),
    getInputValue(id) {
      return this.ports[id].active;
    },
    setInputValue(e, id) {
      let active = event.target.checked;
      this.changePortActive({
        id: id,
        active: active
      });
    }
  },
  computed: {
    ...mapState("midi", ["ports"]),
    ...mapGetters('midi', ["connectedPorts"])
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.devices {
  display: flex;
  flex-wrap: wrap;
  &__heading {
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 600;
  }
}

.device {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 0 1 100%;
  margin: 10px 0;

  &:nth-child(1) {
    margin-top: 0;
  }

  &__text {
    width: 300px;
  }

  &__title {
    font-size: 18px;
  }

  &__subtitle {
    font-size: 14px;
    margin-top: 5px;
    color: rgba(0, 0, 0, 0.5);
  }

  &__form {
    margin-left: 50px;
  }
}
</style>