import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

let savedValues = db.get('shortcuts').value();

const state = {
  ...savedValues
}

const getters = {}

const actions = {
  changeShortcut({ commit }, payload) {
    db.set(`shortcuts.${payload.action}`, payload.key).write();
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