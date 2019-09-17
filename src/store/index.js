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

import defaultSettings from "../logic/defaultSettings";

db.defaults(defaultSettings).write();

export default new Vuex.Store({
  modules: {
    background,
    keyboard,
    particles,
    shortcuts,
    view
  }
});
