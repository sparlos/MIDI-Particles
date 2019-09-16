import gradient from "gradient-color";
import rgbHex from "rgb-hex";

const state = {
  color: "#d16aff",
  gradientStart: "#108dc7", 
  gradientEnd: "#ef8e38",
  mode: "solid"
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
    commit("changeColor", payload);
  },
  changeMode({ commit }, payload) {
    commit("changeMode", payload);
  },
  changeGradientStart({ commit }, payload) {
    commit("changeGradientStart", payload);
  },
  changeGradientEnd({ commit }, payload) {
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
