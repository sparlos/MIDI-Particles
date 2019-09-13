<template>
  <div id="app">
    <div class="container">
      <Perform />
    </div>
  </div>
</template>

<script>
import Perform from "./views/Perform.vue";

export default {
  name: "app",
  components: {
    Perform
  }
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
</style>
