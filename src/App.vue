<template>
  <div id="app">
    <div class="container">
      <transition name="slide" mode="out-in">
        <Perform v-if="view === 'perform'" key="perform" />
        <Settings v-if="view === 'settings'" key="settings" />
      </transition>
    </div>
  </div>
</template>

<script>
import Perform from "./views/Perform.vue";
import Settings from "./views/Settings.vue";

export default {
  name: "app",
  components: {
    Perform,
    Settings
  },
  data: () => ({
    view: "perform"
  })
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
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


button {
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
//transition stuff
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  transition: opacity .15s;
}

.slide-enter-to {
  opacity: 1;
}

.slide-leave {
  transform: translateX(0);
}

.slide-leave-active {
  transition: transform .3s;
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
