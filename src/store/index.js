import Vue from "vue";
import Vuex from "vuex";

import keyboard from "./modules/keyboard";
import background from "./modules/background";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    keyboard,
    background
  }
});
