import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';

import VueAxios from 'vue-axios'
import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css';

import Vuelidate from 'vuelidate'

Vue.use(VueSweetalert2);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.use(Vuelidate)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
