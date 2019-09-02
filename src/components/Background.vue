<template>
  <div class="background">
    <div class="background__overlay"></div>
    <youtube video-id="bZNFRIwlQxQ" width="100%" height="100%" ref="youtube"></youtube>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Background",
  computed: {
    ...mapGetters("background", ["id"]),
    ...mapState("background", ["type", "color", "url", "presets"])
  }
};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  z-index: -10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  & iframe {
    z-index: -12;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>