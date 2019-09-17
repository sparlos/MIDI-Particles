const state = {
  view: "perform",
  activeMenu: "Background"
}

const getters = {
  activeStore: state => {
    console.log(state.activeMenu);
    const menuParser = {
      "Background" : "background",
      "Keyboard" : "keyboard",
      "Particle" : "particles",
      "Shortcut" : "shortcuts",
      "Preset" : "presets"
    }

    return menuParser[state.activeMenu];
  }
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
  getters,
  actions,
  mutations
}