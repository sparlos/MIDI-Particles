<template>
  <div class="settings-window">
    <div class="devices">
      <div class="devices__heading">Current MIDI Inputs:</div>
      <div class="device" v-for="controller in controllers" :key="controller.id">
        {{controller.name}}
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../../components/BaseInput.vue";
import { mapState, mapActions } from "vuex";
import mapComputeds from "../../logic/mapComputeds";

export default {
  name: "MIDISettings",
  components: {
    BaseInput
  },
  data: () => ({
    controllers: []
  }),
  methods: {
    
  },
  computed: {
    settings() {
      return [
        {
          title: "Current MIDI Device",
          subtitle: "Single color or gradient"
        }
      ];
    }
  },
  mounted() {
    navigator.requestMIDIAccess().then((access)=>{
      access.inputs.forEach(element => {
        this.controllers.push(element);
      });

      access.onstatechange = (e) => {
        const ON = 'connected';
        const OFF = 'disconnected';
        console.log(e);
        if(e.port.state === ON && e.port.type === "input") {
          this.controllers.push(e.port);
        } else if (e.port.state === OFF) {
          if(this.controllers.includes(e.port)) {
            let i = this.controllers.indexOf(e.port);
            this.controllers.splice(i, 1);
          };
        }

        
        // console.log(e);
      }
    });
  }
};
</script>

<style scoped lang='scss'>
input[type="text"] {
  width: 250px;
}
</style>