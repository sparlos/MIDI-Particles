import gradient from "gradient-color";
import rgbHex from "rgb-hex";

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

let savedValues = db.get('particles').value();

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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
