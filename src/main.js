import Vue from 'vue'
import App from './App.vue'

//vuex
import store from "./store"

//modules
import VueYoutube from 'vue-youtube'
import VModal from 'vue-js-modal'
import { ValidationProvider, extend } from 'vee-validate'
import Toasted from 'vue-toasted'

//vee validate stuff
import addRules from './logic/addRules';
addRules();
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(VModal)
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000,
  type: 'error'
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
