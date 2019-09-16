import { getIdFromUrl } from 'vue-youtube';

const state = {
  type: 'color',
  color: '#fff000',
  url: 'https://www.youtube.com/watch?v=bZNFRIwlQxQ',
  previousUrl: '',
  videoPlaying: false,
  overlayOpacity: .7,
  playOnMidi: false
}

const getters = {
  id: state => {
    return getIdFromUrl(state.url);
  }
}

const actions = {
  changeUrl({ commit }, payload){
    commit('changeUrl', payload);
  },
  changeVideoPlaying({ commit }, payload){
    commit('changeVideoPlaying', payload);
  },
  changePlayOnMidi({ commit }, payload){
    commit('changePlayOnMidi', payload);
  },
  changeOverlayOpacity({ commit }, payload){
    commit('changeOverlayOpacity', payload);
  },
  changeType({ commit }, payload){
    commit('changeType', payload);
  },
  changeColor({ commit }, payload) {
    commit('changeColor', payload);
  }
}

const mutations = { 
  changeUrl(state, payload){
    state.previousUrl = state.url;
    state.url = payload.url;
  },
  changeVideoPlaying(state, payload){
    state.videoPlaying = payload.videoPlaying;
  },
  changePlayOnMidi(state, payload){
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}