// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import iView from 'iview';
import axios from 'axios';
import VueBus from 'vue-bus';
import echarts from 'echarts';
import './global/initProject.js';
import './global/setting.js';
import '../static/css/animate.css'
import 'iview/dist/styles/iview.css';
import '../static/css/reset.css';
import '../static/css/ol.css'
Vue.use(iView);
Vue.use(VueBus);
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
new Vue({
  el: '#gmSystem',
  router,
  template: '<App/>',
  components: { App }
})
