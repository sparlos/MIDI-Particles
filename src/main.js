import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(VModal)

new Vue({
  render: h => h(App),
}).$mount('#app')
