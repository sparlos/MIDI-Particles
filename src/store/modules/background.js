import { getIdFromUrl } from "vue-youtube";

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

let savedValues = db.get('background').value();

const state = {
  previousUrl: "",
  videoPlaying: false,
  ...savedValues
};

const getters = {
  id: state => {
    return getIdFromUrl(state.url);
  }
};

const actions = {
  changeUrl({ commit, state }, payload) {
    //check if previous url contains valid id
    if (getIdFromUrl(state.url)) {
      state.previousUrl = state.url;
    }
    db.set('background.url', payload.url).write();
    commit("changeUrl", payload);
  },
  changeVideoPlaying({ commit }, payload) {
    commit("changeVideoPlaying", payload);
  },
  changePlayOnMidi({ commit }, payload) {
    db.set('background.playOnMidi', payload.playOnMidi).write();
    commit("changePlayOnMidi", payload);
  },
  changeOverlayOpacity({ commit }, payload) {
    db.set('background.overlayOpacity', payload.overlayOpacity).write();
    commit("changeOverlayOpacity", payload);
  },
  changeType({ commit }, payload) {
    db.set('background.type', payload.type).write();
    commit("changeType", payload);
  },
  changeColor({ commit }, payload) {
    db.set('background.color', payload.color).write();
    commit("changeColor", payload);
  },
  changeVideoHotkey({ commit }, payload) {
    db.set('background.videoHotkey', payload.videoHotkey).write();
    commit("changeVideoHotkey", payload);
  }
};

const mutations = {
  changeUrl(state, payload) {
    state.url = payload.url;
  },
  changeVideoPlaying(state, payload) {
    state.videoPlaying = payload.videoPlaying;
  },
  changePlayOnMidi(state, payload) {
    state.playOnMidi = payload.playOnMidi;
  },
  changeOverlayOpacity(state, payload) {
    state.overlayOpacity = payload.overlayOpacity;
  },
  changeType(state, payload) {
    state.type = payload.type;
  },
  changeColor(state, payload) {
    state.color = payload.color;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
