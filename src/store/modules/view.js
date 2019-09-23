import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import defaultSettings from "../../logic/defaultSettings";

const adapter = new LocalStorage('db');
const db = low(adapter);

let savedValues = db.get('view').value();
if(!savedValues) savedValues = defaultSettings.view;

const state = {
  ...savedValues,
  view: "perform",
  activeMenu: "Background",
  midiSupport: true
}

const getters = {
  activeStore: state => {
    const menuParser = {
      "Background" : "background",
      "Keyboard" : "keyboard",
      "Particle" : "particles",
      "Shortcut" : "shortcuts",
      "Preset" : "presets"
    }

    return menuParser[state.activeMenu];
  }
}

const actions = {
  changeView({ commit }, payload) {
    commit('changeView', payload);
  },
  changeActiveMenu( { commit }, payload) {
    commit('changeActiveMenu', payload);
  },
  changeMidiSupport({ commit }, payload) {
    commit('changeMidiSupport', payload);
  },
  changeInitialToast({ commit }, payload) {
    commit('changeInitialToast', payload);
  }
}

const mutations = {
  changeView(state, payload) {
    state.view = payload.view;
  },
  changeActiveMenu(state, payload) {
    state.activeMenu = payload.activeMenu;
  },
  changeMidiSupport(state, payload) {
    state.midiSupport = payload.midiSupport;
  },
  changeInitialToast(state, payload) {
    db.set('view.initialToast', payload.initialToast).write();
    state.initialToast = payload.initialToast;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}