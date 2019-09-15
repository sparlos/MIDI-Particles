import { getIdFromUrl } from 'vue-youtube';

const state = {
  type: 'video',
  color: 'green',
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}