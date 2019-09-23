<template>
  <div id="app">
    <div class="container">
      <Background ref="background" />
      <transition :name="transition" mode="out-in">
        <Perform v-if="view === 'perform'" key="perform" :player="player" />
        <Settings v-if="view === 'settings'" key="settings" />
      </transition>
    </div>
  </div>
</template>

<script>
import Perform from "./views/Perform.vue";
import Settings from "./views/Settings.vue";
import Background from "./components/Background.vue";

import { mapState, mapActions } from "vuex";

//lowdb stuff
import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import defaultSettings from "./logic/defaultSettings";

const adapter = new LocalStorage("db");
const db = low(adapter);

export default {
  name: "app",
  components: {
    Perform,
    Settings,
    Background
  },
  data: () => ({
    player: null
  }),
  computed: {
    ...mapState("view", ["view", "initialToast"]),
    ...mapState("midi", ["ports"]),
    transition() {
      return this.view === "perform" ? "slide-left" : "slide-right";
    }
  },
  methods: {
    ...mapActions("view", ["changeInitialToast"]),
    ...mapActions("midi", ["connectPort"]),
    setupMidi() {
      navigator.requestMIDIAccess().then(access => {
        for (let input of access.inputs.values()) {
          this.connectPort({
            id: input.id,
            connected: true,
            name: input.name
          });
        }

        access.onstatechange = e => {
          let port = e.port;
          if (port.state === "connected" && port.type === "input") {
            port.onmidimessage = this.handleMidiMessage;
            if (
              (this.ports[port.id] && !this.ports[port.id].connected) ||
              !this.ports[port.id]
            ) {
              this.$toasted.show(`${port.name} connected!`, {
                duration: 3000,
                position: "top-center",
                action: {
                  text: "close",
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  }
                }
              });
            }
            this.connectPort({
              id: port.id,
              connected: true,
              name: port.name
            });
          } else if (port.state === "disconnected" && port.type === "input") {
            port.onmidimessage = () => {};
            this.connectPort({
              id: port.id,
              connected: false,
              name: port.name
            });
          }
        };
      });
    }
  },
  created() {
    for (let submenu in defaultSettings) {
      let settings = defaultSettings[submenu];

      for (let setting in settings) {
        let savedValue = db.get(`${submenu}.${setting}`).value();
        let defaultValue = defaultSettings[submenu][setting];

        if (savedValue === undefined) {
          //handle a shortcut
          if (submenu === "shortcuts") {
            this.$store.dispatch("shortcuts/changeShortcut", {
              action: setting,
              key: defaultValue
            });
          //handle everything else
          } else {
            let capitalizedSetting =
              setting.charAt(0).toUpperCase() + setting.slice(1);
            let action = `change${capitalizedSetting}`;
            this.$store.dispatch(`${submenu}/${action}`, {
              [setting]: defaultValue
            });
          }
        }
      }
    }
  },
  mounted() {
    this.setupMidi();
    //get background ref
    this.player = this.$refs.background.player;
    //show initial toast
    if (this.initialToast) {
      this.$toasted.show(
        "Press Escape to open settings & customize your experience!",
        {
          duration: 8000,
          position: "top-center",
          action: [
            {
              text: "close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            },
            {
              text: "disable message",
              onClick: (e, toastObject) => {
                this.changeInitialToast({
                  initialToast: false
                });
                toastObject.goAway(0);
              }
            }
          ]
        }
      );
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

#app {
  overflow: hidden;
  position: relative;
}

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

//transition stuff
.slide-left-enter {
  opacity: 0;
}

.slide-left-enter-active {
  transition: opacity 0.15s;
}

.slide-left-enter-to {
  opacity: 1;
}

.slide-left-leave {
  transform: translateX(0);
}

.slide-left-leave-active {
  transition: transform 0.3s;
}

.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-right-enter {
  opacity: 0;
}

.slide-right-enter-active {
  transition: opacity 0.1s;
}

.slide-right-enter-to {
  opacity: 1;
}

.slide-right-leave {
  transform: translateX(0);
}

.slide-right-leave-active {
  transition: transform 0.3s;
}

.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>
