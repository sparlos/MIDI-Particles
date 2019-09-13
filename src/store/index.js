import Vue from "vue";
import Vuex from "vuex";

import keyboard from "./modules/keyboard";
import background from "./modules/background";
import view from "./modules/view";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    keyboard,
    background,
    view
  }
});
