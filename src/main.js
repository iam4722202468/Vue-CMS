import Vue from 'vue'
import App from '../Vue-CMS-Data/App.vue'
import router from './router'
import VueHighlightJS from 'vue-highlightjs'
import VueCarousel from 'vue-carousel';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.use(VueHighlightJS);
Vue.use(VueCarousel);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
