<template>
  <div class="settings">
    <div class="header">
      <div class="header__title">MIDI Particles</div>
    </div>

    <div class="content">
      <div class="navbar">
        <div
          class="navbar__item"
          :class="activeMenu === item.name ? 'navbar__item--active' : ''"
          v-for="(item, i) in menus"
          :key="i"
          @click="changeActiveMenu({
            activeMenu: item.name
          })"
        >
          <div class="icon">
            <ion-icon :name="item.icon"></ion-icon>
          </div>
          <div class="name">{{item.label}}</div>
        </div>
        <div class="navbar__spacer"></div>
        <div class="navbar__item navbar__footer">
          <div class="icon">
            <ion-icon name="arrow-back"></ion-icon>
          </div>
          <div class="name" @click="changeView({view: 'perform'})">Back to Perform</div>
        </div>
      </div>

      <div class="main">
        <div class="main__header">{{activeMenu}} Settings</div>
        <div class="options">
          <component :is="activeMenu + 'Settings'"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundSettings from "./settings/BackgroundSettings";
import KeyboardSettings from "./settings/KeyboardSettings";
import ParticleSettings from "./settings/ParticleSettings";
import { mapState, mapActions } from "vuex";

export default {
  name: "Settings",
  components: {
    BackgroundSettings,
    KeyboardSettings,
    ParticleSettings
  },
  data: () => ({
    menus: [
      {
        name: "Background",
        label: "Background",
        icon: "image"
      },
      {
        name: "Keyboard",
        label: "Keyboard",
        icon: "musical-note"
      },
      {
        name: "Particle",
        label: "Particles",
        icon: "color-wand"
      },
      {
        name: "Preset",
        label: "Presets",
        icon: "bookmark"
      },
      {
        name: "Shortcut",
        label: "Shortcuts",
        icon: "square-outline"
      }
    ]
  }),
  computed: {
    ...mapState("view", {
      view: "view",
      activeMenu: "activeMenu"
    })
  },  
  methods: {
    ...mapActions("view", ["changeView", "changeActiveMenu"]),
    handleKeyup(e) {
      switch (e.key) {
        case "Escape":
          this.changeView({
            view: "perform"
          });
          this.$toasted.clear();
          break;
      }
    }
  },
  mounted() {
    document.addEventListener("keyup", this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.handleKeyup);
  }
};
</script>

<style scoped lang='scss'>
$main-margin: 54px;
$header-height: 75px;
$title-margin: 80px;
$item-height: 60px;
$item-padding: calc(#{$item-height} / 2);

.settings {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.header {
  flex: 0 1 100%;
  background-color: white;
  height: $header-height;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;

  &__title {
    margin-left: $title-margin;
    font-size: 30px;
    font-weight: bold;
  }
}

.content {
  height: calc((100% - #{$header-height}) - (#{$main-margin} * 2));
  flex: 0 1 100%;
  display: flex;
}

.navbar {
  flex: 0 1 20%;
  min-width: 250px;
  height: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-left: $main-margin;
  display: flex;
  flex-direction: column;

  &__item {
    height: $item-height;
    padding-left: calc(#{$title-margin} - #{$main-margin});
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      cursor: pointer;
    }

    &--active {
      color: #2699fb;
      background-color: #f2f9ff;
      position: relative;

      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background-color: #2699fb;
      }
    }

    & .icon {
      display: flex;
      align-items: center;
    }

    & .name {
      margin-left: 8px;
    }
  }

  &__spacer {
    flex: 1 1;
  }

  &__footer {
    height: calc(#{$item-height} * 1.5);
  }
}

.main {
  flex: 1 0;
  margin-left: $main-margin;
  margin-right: $main-margin;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  &__header {
    width: 100%;
    margin-bottom: 16px;
    font-size: 35px;
  }
}

.options {
  background-color: white;
  flex: 1 0;
  overflow: scroll;
  padding: 70px;
}

.settings-window {
  display: flex;
  flex-wrap: wrap;
}
</style>