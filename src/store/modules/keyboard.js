const state = {
  color: '#d16aff',
  disabled: false
}

const getters = {

}

const actions = {
  changeColor({ commit }, payload) {
    commit('changeColor', payload);
  },
  setState( { commit }, payload ) {
    commit('setState', payload);
  }
}

const mutations = { 
  changeColor(state, payload) {
    state.color = payload.color;
  },
  setState(state, payload) {
    state.disabled = payload.disabled
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}