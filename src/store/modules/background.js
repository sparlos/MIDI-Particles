import { getIdFromUrl } from "vue-youtube";

const state = {
  type: "video",
  color: "#fff000",
  url: "https://www.youtube.com/watch?v=bZNFRIwlQxQ",
  previousUrl: "",
  videoPlaying: false,
  videoHotkey: " ",
  overlayOpacity: 0.7,
  playOnMidi: false
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
    commit("changeUrl", payload);
  },
  changeVideoPlaying({ commit }, payload) {
    commit("changeVideoPlaying", payload);
  },
  changePlayOnMidi({ commit }, payload) {
    commit("changePlayOnMidi", payload);
  },
  changeOverlayOpacity({ commit }, payload) {
    commit("changeOverlayOpacity", payload);
  },
  changeType({ commit }, payload) {
    commit("changeType", payload);
  },
  changeColor({ commit }, payload) {
    commit("changeColor", payload);
  },
  changeVideoHotkey({ commit }, payload) {
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
