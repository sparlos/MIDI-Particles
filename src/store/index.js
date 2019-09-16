import Vue from "vue";
import Vuex from "vuex";

import keyboard from "./modules/keyboard";
import background from "./modules/background";
import view from "./modules/view";
import particles from "./modules/particles";
import shortcuts from "./modules/shortcuts";

Vue.use(Vuex);

//lowdb stuff

import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage("db");
const db = low(adapter);

db.defaults({
  background: {
    type: "video",
    color: "#fff000",
    url: "https://www.youtube.com/watch?v=bZNFRIwlQxQ",
    overlayOpacity: 0.7,
    playOnMidi: false
  },
  keyboard: {
    octaves: 4,
    baseOctave: 4,
    opacity: 1,
    naturalsColor: "#ffffff",
    accidentalsColor: "#000000",
    height: 150,
    visible: true
  },
  particles: {
    color: "#d16aff",
    gradientStart: "#108dc7",
    gradientEnd: "#ef8e38",
    mode: "solid"
  },
  shortcuts: {
    toggleVideo: " "
  }
}).write();

export default new Vuex.Store({
  modules: {
    background,
    keyboard,
    particles,
    shortcuts,
    view
  }
});
