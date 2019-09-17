const state = {
  ports: {}
};

const getters = {
  connectedPorts: state => {
    let connectedPorts = {};
    for(let id in state.ports) {
      let port = state.ports[id];
      if(port.connected) connectedPorts[id] = port;
    }
    return connectedPorts;
  }
};

const actions = {
  connectPort({ commit }, payload) {
    commit("connectPort", payload);
  },
  changePortActive({ commit }, payload) {
    commit("changePortActive", payload);
  }
};

const mutations = {
  connectPort(state, payload) {
    state.ports = {
      ...state.ports,
      [payload.id]: {
        connected: payload.connected,
        name: payload.name,
        active: true
      }
    }
  },
  changePortActive(state, payload) {
    // state.ports[payload.id] = {
    //   ...state.ports[payload.id],
    //   active: payload.active
    // };
    state.ports = {
      ...state.ports,
      [payload.id]: {
        ...state.ports[payload.id],
        active: payload.active
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
