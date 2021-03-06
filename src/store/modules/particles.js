import gradient from "gradient-color";
import rgbHex from "rgb-hex";

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import defaultSettings from "../../logic/defaultSettings";

const adapter = new LocalStorage('db');
const db = low(adapter);

let savedValues = db.get('particles').value();
if(!savedValues) savedValues = defaultSettings.particles;

const state = {
  ...savedValues
};

const getters = {
  gradient: (state) => {
    return [state.gradientStart, state.gradientEnd];
  },
  gradientArray: (state, getters, rootState, rootGetters) => {
    let colors = gradient(getters.gradient, rootGetters['keyboard/keyLength']);
    colors.forEach((v, i) => (colors[i] = `#${rgbHex(v)}`));
    return colors;
  }
};

const actions = {
  changeColor({ commit }, payload) {
    db.set('particles.color', payload.color).write();
    commit("changeColor", payload);
  },
  changeMode({ commit }, payload) {
    db.set('particles.mode', payload.mode).write();
    commit("changeMode", payload);
  },
  changeGradientStart({ commit }, payload) {
    db.set('particles.gradientStart', payload.gradientStart).write();
    commit("changeGradientStart", payload);
  },
  changeGradientEnd({ commit }, payload) {
    db.set('particles.gradientEnd', payload.gradientEnd).write();
    commit("changeGradientEnd", payload);
  },
  changeMinSize({ commit }, payload) {
    db.set('particles.minSize', payload.minSize).write();
    commit("changeMinSize", payload);
  },
  changeMaxSize({ commit }, payload) {
    db.set('particles.maxSize', payload.maxSize).write();
    commit("changeMaxSize", payload);
  }
};

const mutations = {
  changeColor(state, payload) {
    state.color = payload.color;
  },
  changeMode(state, payload) {
    state.mode = payload.mode;
  },
  changeGradientStart(state, payload) {
    state.gradientStart = payload.gradientStart;
  },
  changeGradientEnd(state, payload) {
    state.gradientEnd = payload.gradientEnd;
  },
  changeMinSize(state, payload) {
    state.minSize = payload.minSize;
  },
  changeMaxSize(state, payload) {
    state.maxSize = payload.maxSize;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
