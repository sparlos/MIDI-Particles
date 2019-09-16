const state = {
  toggleVideo: " "
}

const getters = {}

const actions = {
  changeShortcut({ commit }, payload) {
    commit('changeShortcut', payload);
  }
}

const mutations = {
  changeShortcut(state, payload) {
    state[payload.action] = payload.key;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};