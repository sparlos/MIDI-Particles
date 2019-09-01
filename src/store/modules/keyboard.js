const state = {
  color: '#d16aff'
}

const getters = {

}

const actions = {
  changeColor({ commit }, payload) {
    commit('changeColor', payload);
  }
}

const mutations = {
  changeColor(state, payload) {
    state.color = payload.color;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}