const state = {
  view: "perform"
}

const actions = {
  changeView({ commit }, payload) {
    commit('changeView', payload);
  }
}

const mutations = {
  changeView(state, payload) {
    state.view = payload.view;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}