import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import defaultSettings from "../../logic/defaultSettings";

const adapter = new LocalStorage('db');
const db = low(adapter);

let savedValues = db.get('keyboard').value();
if(!savedValues) savedValues = defaultSettings.keyboard;

const state = {
  disabled: false,
  ...savedValues
};

const getters = {
  heightPixels: state => {
    return `${state.height}px`;
  },
  keyLength: state => {
    return 12 * state.octaves;
  }
};

const actions = {
  setState({ commit }, payload) {
    commit("setState", payload);
  },
  changeOctaves({ commit }, payload) {
    db.set('keyboard.octaves', payload.octaves).write();
    commit("changeOctaves", payload);
  },
  changeBaseOctave({ commit }, payload) {
    db.set('keyboard.baseOctave', payload.baseOctave).write();
    commit("changeBaseOctave", payload);
  },
  changeOpacity({ commit }, payload) {
    db.set('keyboard.opacity', payload.opacity).write();
    commit("changeOpacity", payload);
  },
  changeNaturalsColor({ commit }, payload) {
    db.set('keyboard.naturalsColor', payload.naturalsColor).write();
    commit("changeNaturalsColor", payload);
  },
  changeAccidentalsColor({ commit }, payload) {
    db.set('keyboard.accidentalsColor', payload.accidentalsColor).write();
    commit("changeAccidentalsColor", payload);
  },
  changeHeight({ commit }, payload) {
    db.set('keyboard.height', payload.height).write();
    commit("changeHeight", payload);
  },
  changeVisible({ commit }, payload) {
    db.set('keyboard.visible', payload.visible).write();
    commit("changeVisible", payload);
  }
};

const mutations = {
  setState(state, payload) {
    state.disabled = payload.disabled;
  },
  changeOctaves(state, payload) {
    state.octaves = payload.octaves;
  },
  changeBaseOctave(state, payload) {
    state.baseOctave = payload.baseOctave;
  },
  changeOpacity(state, payload) {
    state.opacity = payload.opacity;
  },
  changeNaturalsColor(state, payload) {
    state.naturalsColor = payload.naturalsColor;
  },
  changeAccidentalsColor(state, payload) {
    state.accidentalsColor = payload.accidentalsColor;
  },
  changeHeight(state, payload) {
    state.height = payload.height;
  },
  changeVisible(state, payload) {
    state.visible = payload.visible;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
