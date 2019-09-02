import { getIdFromUrl } from 'vue-youtube';

const state = {
  type: 'color',
  color: 'green',
  url: 'https://www.youtube.com/watch?v=bZNFRIwlQxQ',
  presets: {
    videos: [],
    colors: []
  }
}

const getters = {
  id: state => {
    return getIdFromUrl(state.url);
  }
}

const actions = {

}

const mutations = { 

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}