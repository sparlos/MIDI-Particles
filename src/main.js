import Vue from 'vue'
import App from './App.vue'

//vuex
import store from "./store"

//modules
import VueYoutube from 'vue-youtube'
import VModal from 'vue-js-modal'
import { ValidationProvider } from 'vee-validate'
import Toasted from 'vue-toasted'

//vee validate stuff
import addRules from './logic/addRules';
addRules();
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(VModal, {dialog: true})
Vue.use(Toasted)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
