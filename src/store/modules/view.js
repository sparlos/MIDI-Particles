const state = {
  view: "perform",
  activeMenu: "Background",
  midiSupport: true
}

const getters = {
  activeStore: state => {
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
  },
  changeMidiSupport({ commit }, payload) {
    commit('changeMidiSupport', payload);
  }
}

const mutations = {
  changeView(state, payload) {
    state.view = payload.view;
  },
  changeActiveMenu(state, payload) {
    state.activeMenu = payload.activeMenu;
  },
  changeMidiSupport(state, payload) {
    state.midiSupport = payload.midiSupport;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}