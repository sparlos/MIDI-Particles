const state = {
  ports: {}
}

const getters = {}

const actions = {
  changePorts({ commit }, payload) {
    commit('changePorts', payload);
  }
}

const mutations = {
  changePorts(state, payload) {
    state.ports[payload.id] = payload.active;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};