const state = {
  color: "#d16aff",
  disabled: false,
  octaves: 4,
  baseOctave: 3,
  opacity: 1,
  naturalsColor: 'white',
  accidentalsColor: 'black'
};

const getters = {};

const actions = {
  changeColor({ commit }, payload) {
    commit("changeColor", payload);
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
  }
};

const mutations = {
  changeColor(state, payload) {
    state.color = payload.color;
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
    state.opacity = payload.opacity
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
