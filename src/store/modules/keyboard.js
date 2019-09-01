const state = {
  color: '#d16aff'
}

const getters = {

}

const actions = {

}

const mutations = {
  changeColor(state, newColor) {
    state.color = newColor;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}