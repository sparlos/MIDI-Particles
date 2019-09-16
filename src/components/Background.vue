<template>
  <div class="background">
    <div class="background__overlay" v-if="type==='video'" :style="{opacity: overlayOpacity}"></div>
    <div class="background__color" v-show="type==='color'" :style="{backgroundColor: color}"></div>
    <div class="background__video" v-show="type==='video'">
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
  data: () => ({
    initialToast: false
  }),
  methods: {
    ...mapActions("background", ["changeUrl", "changeVideoPlaying"]),
    handleVideoError() {
      console.log("bad");
    },
    toggleVideo() {
      if (!this.videoPlaying) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    },
    setupShortcuts(e) {
      if (e.key === this.toggleVideoShortcut) {
        this.toggleVideo();
      }
    },
    addListeners() {
      document.addEventListener("keydown", this.setupShortcuts);
    },
    destroyListeners() {
      document.removeEventListener("keydown", this.setupShortcuts);
    }
  },
  watch: {
    id() {
      if (this.type === "video") {
        if (this.id === null) {
          this.changeUrl({
            url: this.previousUrl
          }),
            this.$toasted.error(
              "That was not a valid YouTube URL! Reverting to previous URL...",
              {
                duration: 3000,
                position: "bottom-right",
                action: {
                  text: "close",
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  }
                }
              }
            );
        }
      }
    },
    view(newValue) {
      if (newValue === "perform" && this.type === "video") {
        this.addListeners();
      } else if (newValue === "settings") {
        this.player.pauseVideo();
        this.destroyListeners();
      }
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
    ...mapState("shortcuts", {
      toggleVideoShortcut: "toggleVideo"
    }),
    ...mapState("view", ["view"]),
    player() {
      if (this.$refs.youtube) return this.$refs.youtube.player;
    }
  },
  mounted() {
    if (this.player) this.player.mute();
    this.addListeners();
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