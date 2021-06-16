import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import VueAnalytics from 'vue-analytics';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import BootstrapVue from 'bootstrap-vue';

import RenderWidget from '@/components/RenderWidget.vue';
import router from './router';
import App from '../Vue-CMS-Data/App.vue';

Vue.use(BootstrapVue);

Vue.use(VueHighlightJS);

Vue.component('RenderWidget', RenderWidget);

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-128036135-2',
  router,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
