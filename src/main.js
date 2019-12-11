import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from './../locale';
import './plugin';
import './global'

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#phantom')
