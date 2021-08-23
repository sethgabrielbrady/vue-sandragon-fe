import Vue from 'vue/dist/vue.js';
import App from './App.vue'
import router from './router.js';
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance, uploadAxiosInstance} from './backend/axios'
import Router from 'vue-router'
import Vuex from 'vuex'
import './assets/tailwind.css'

Vue.use(Router);
Vue.use(Vuex);

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance,
  upload: uploadAxiosInstance
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  uploadAxiosInstance,
  components: { App },
  template: '<App/>'
})
