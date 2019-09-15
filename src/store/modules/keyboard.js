import gradient from "gradient-color";
import rgbHex from "rgb-hex";

const state = {
  particleColor: "#d16aff",
  particleGradient: ["#108dc7", "#ef8e38"],
  colorMode: "gradient",
  disabled: false,
  octaves: 4,
  baseOctave: 3,
  opacity: 1,
  naturalsColor: "#ffffff",
  accidentalsColor: "#000000",
  height: 150,
  visible: true
};

const getters = {
  heightPixels: state => {
    return `${state.height}px`;
  },
  length: state => {
    return 12 * state.octaves;
  },
  gradientArray: (state, getters) => {
    let colors = gradient(state.particleGradient, getters.length);
    colors.forEach((v, i) => (colors[i] = `#${rgbHex(v)}`));
    return colors;
  }
};

const actions = {
  changeParticleColor({ commit }, payload) {
    commit("changeParticleColor", payload);
  },
  setState({ commit }, payload) {
    commit("setState", payload);
  },
  changeOctaves({ commit }, payload) {
    commit("changeOctaves", payload);
  },
  changeBaseOctave({ commit }, payload) {
    commit("changeBaseOctave", payload);
  },
  changeOpacity({ commit }, payload) {
    commit("changeOpacity", payload);
  },
  changeNaturalsColor({ commit }, payload) {
    commit("changeNaturalsColor", payload);
  },
  changeAccidentalsColor({ commit }, payload) {
    commit("changeAccidentalsColor", payload);
  },
  changeHeight({ commit }, payload) {
    commit("changeHeight", payload);
  },
  changeVisible({ commit }, payload) {
    commit("changeVisible", payload);
  },
  changeColorMode({ commit }, payload) {
    commit("changeColorMode", payload);
  },
  changeParticleGradient({ commit }, payload) {
    commit("changeParticleGradient", payload);
  }
};

const mutations = {
  changeParticleColor(state, payload) {
    state.particleColor = payload.particleColor;
  },
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
  },
  changeColorMode(state, payload) {
    state.colorMode = payload.colorMode;
  },
  changeParticleGradient(state, payload) {
    state.particleGradient.splice(payload.index, 1, payload.color);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
