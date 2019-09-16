<template>
  <div id="app">
    <div class="container">
      <Background ref="background" />
      <transition :name="transition" mode="out-in">
        <Perform v-if="view === 'perform'" key="perform" />
        <Settings v-if="view === 'settings'" key="settings" />
      </transition>
    </div>
  </div>
</template>

<script>
import Perform from "./views/Perform.vue";
import Settings from "./views/Settings.vue";
import Background from "./components/Background.vue"

import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Perform,
    Settings,
    Background
  },
  data: () => ({
    initialToast: false
  }),
  computed: {
    ...mapState("view", ["view"]),
    transition() {
      return this.view === "perform" ? "slide-left" : "slide-right";
    }
  },
  mounted() {
    //show initial toast
    if (!this.initialToast) {
      this.$toasted.show(
        "Press Escape to open settings & customize your experience!",
        {
          duration: 8000,
          position: "top-center",
          action: {
            text: "close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        }
      );
      this.initialToast = true;
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
