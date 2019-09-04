import { getIdFromUrl } from 'vue-youtube';

const state = {
  type: 'video',
  color: 'green',
  url: 'https://www.youtube.com/watch?v=bZNFRIwlQxQ',
  previousUrl: '',
  presets: {
    videos: [],
    colors: []
  },
  overlayOpacity: .7
}

const getters = {
  id: state => {
    return getIdFromUrl(state.url);
  }
}

const actions = {
  changeUrl({ commit }, payload){
    commit('changeUrl', payload);
  }
}

const mutations = { 
  changeUrl(state, payload){
    state.previousUrl = state.url;
    state.url = payload.url;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}