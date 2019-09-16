const state = {
  view: "perform",
  activeMenu: "Background"
}

const actions = {
  changeView({ commit }, payload) {
    commit('changeView', payload);
  },
  changeActiveMenu( { commit }, payload) {
    commit('changeActiveMenu', payload);
  }
}

const mutations = {
  changeView(state, payload) {
    state.view = payload.view;
  },
  changeActiveMenu(state, payload) {
    state.activeMenu = payload.activeMenu;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}