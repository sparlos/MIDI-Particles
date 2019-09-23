<template>
  <div class="settings">
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
            <ion-icon v-bind="item.iconAttrs"></ion-icon>
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

      <!-- setting reset modal -->
      <v-dialog />

      <div class="main">
        <div class="main__header">
          {{activeMenu}} Settings
          <ion-icon
            v-if="activeMenu !== 'MIDI' && activeMenu !== 'Advanced'"
            name="refresh"
            @click="promptResetModal"
          ></ion-icon>
        </div>
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
import ShortcutSettings from "./settings/ShortcutSettings";
import MIDISettings from "./settings/MIDISettings";
import AdvancedSettings from "./settings/AdvancedSettings";
import { mapState, mapGetters, mapActions } from "vuex";

import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage("db");
const db = low(adapter);

import defaultSettings from "../logic/defaultSettings";

export default {
  name: "Settings",
  components: {
    BackgroundSettings,
    KeyboardSettings,
    ParticleSettings,
    ShortcutSettings,
    MIDISettings,
    AdvancedSettings
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
  computed: {
    ...mapState("view", {
      view: "view",
      activeMenu: "activeMenu"
    }),
    ...mapGetters("view", ["activeStore"]),
    menus() {
      return [
        {
          name: "Background",
          label: "Background",
          iconAttrs: {
            name: "image"
          }
        },
        {
          name: "Keyboard",
          label: "Keyboard",
          iconAttrs: {
            src: `${this.publicPath}keyboard-fat.svg`
            // name: 'square'
          }
        },
        {
          name: "Particle",
          label: "Particles",
          iconAttrs: {
            name: "color-wand"
          }
        },
        //re-add when you actually have a preset system
        // {
        //   name: "Preset",
        //   label: "Presets",
        // },
        {
          name: "Shortcut",
          label: "Shortcuts",
          iconAttrs: {
            src: `${this.publicPath}kbd-shortcut.svg`
          }
        },
        {
          name: "MIDI",
          label: "MIDI",
          iconAttrs: {
            src: `${this.publicPath}midi.svg`
          }
        },
        {
          name: "Advanced",
          label: "Advanced",
          iconAttrs: {
            name: "construct"
          }
        }
      ];
    }
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
    },
    promptResetModal() {
      this.$modal.show("dialog", {
        title: `Reset ${this.activeMenu} Settings?`,
        text: `This will reset all ${this.activeMenu.toLowerCase()} settings to their default value on page refresh.`,
        buttons: [
          {
            title: "RESET",
            handler: this.resetSettings,
            default: true
          },
          {
            title: "CLOSE"
          }
        ]
      });
    },
    resetSettings() {
      this.$modal.hide("dialog");
      db.set(this.activeStore, defaultSettings[this.activeStore]).write();
      this.$toasted.show(
        `${this.activeMenu} settings reset. Refresh page to complete.`,
        {
          duration: 3000,
          position: "bottom-center",
          action: {
            text: "close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        }
      );
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
$bg-color: white;

.settings {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.content {
  height: calc((100% - #{$header-height}) - (#{$main-margin} * 2));
  flex: 0 1 100%;
  display: flex;
  margin-top: 50px;
}

.navbar {
  flex: 0 1 20%;
  min-width: 250px;
  height: 100%;
  background-color: $bg-color;
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
    background-color: $bg-color;
    margin-bottom: 16px;
    padding: 10px 25px;
    border-radius: 3px;
    font-size: 35px;
    align-self: flex-start;

    display: flex;
    align-items: center;

    & ion-icon {
      margin-left: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.options {
  background-color: $bg-color;
  flex: 1 0;
  overflow: scroll;
  padding: 70px;
  border-radius: 5px;
}

.settings-window {
  display: flex;
  flex-wrap: wrap;
}
</style>