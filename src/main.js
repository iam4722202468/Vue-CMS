import Vue from 'vue'
import App from '../Vue-CMS-Data/App.vue'
import router from './router'
import VueHighlightJS from 'vue-highlightjs'
import RenderWidget from '@/components/RenderWidget.vue'
import VueAnalytics from 'vue-analytics';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.use(VueHighlightJS);

Vue.component('RenderWidget', RenderWidget)

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-128036135-2',
  router
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
