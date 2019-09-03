const state = {
  particleColor: "#d16aff",
  disabled: false,
  octaves: 4,
  baseOctave: 3,
  opacity: 1,
  naturalsColor: '#ffffff',
  accidentalsColor: '#000'
};

const getters = {};

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
  changeBaseOctave({commit}, payload) {
    commit("changeBaseOctave", payload);
  },
  changeOpacity({ commit }, payload){
    commit('changeOpacity', payload);
  },
  changeNaturalsColor({ commit }, payload){
    commit('changeNaturalsColor', payload);
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
  changeOpacity(state, payload){
    state.opacity = payload.opacity;
  },
  changeNaturalsColor(state, payload){
    state.naturalsColor = payload.naturalsColor;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
