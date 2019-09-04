<template>
  <div class="background">
    <div class="background__overlay" :style="{opacity: overlayOpacity}"></div>
    <div class="background__color" v-if="type==='color'" :style="{backgroundColor: color}"></div>
    <div class="background__video" v-if="type==='video'">
      <youtube :video-id="id" width="100%" height="100%" ref="youtube"></youtube>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Background",
  methods: {
    ...mapActions('background', [
      'changeUrl'
    ]),
    handleVideoError() {
      console.log('bad');
    }
  },
  computed: {
    ...mapGetters("background", ["id"]),
    ...mapState("background", [
      "type",
      "color",
      "url",
      "previousUrl",
      "presets",
      "overlayOpacity"
    ])
  },
  watch: {
    id(newValue, previousValue) {
      if(newValue === null) {
        this.changeUrl({
          url: this.previousUrl
        })
      }
    }
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

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 1);
  }

  &__video,
  &__color {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    & iframe {
      z-index: -12;
    }
  }
}
</style>