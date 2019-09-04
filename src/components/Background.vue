<template>
  <div class="background">
    <div class="background__overlay" :style="{opacity: overlayOpacity}"></div>
    <div class="background__color" v-if="type==='color'" :style="{backgroundColor: color}"></div>
    <div class="background__video" v-if="type==='video'">
      <youtube
        :video-id="id"
        width="100%"
        height="100%"
        ref="youtube"
        @playing="changeVideoPlaying({videoPlaying: true})"
        @paused="changeVideoPlaying({videoPlaying: false})"
      ></youtube>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Background",
  methods: {
    ...mapActions("background", ["changeUrl", "changeVideoPlaying"]),
    handleVideoError() {
      console.log("bad");
    },
    setupShortcuts() {
      document.addEventListener("keydown", e => {
        if (e.key === " ") {
          if (!this.videoPlaying) {
            this.player.playVideo();
          } else {
            this.player.pauseVideo();
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters("background", ["id"]),
    ...mapState("background", [
      "type",
      "color",
      "url",
      "previousUrl",
      "videoPlaying",
      "presets",
      "overlayOpacity"
    ]),
    player() {
      return this.$refs.youtube.player;
    }
  },
  watch: {
    id(newValue, previousValue) {
      //https://www.youtube.com/watch?v=rZVxXro9YdA
      if (newValue === null) {
        this.changeUrl({
          url: this.previousUrl
        }),
          this.$toasted.show(
            "That was not a valid YouTube URL! Reverting to previous URL..."
          );
      }
    }
  },
  mounted() {
    this.player.mute();
    this.setupShortcuts();
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