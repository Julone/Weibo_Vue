import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import ElementUI from 'element-ui';
import './../theme/index.css';
// import "element-ui/lib/theme-chalk/index.css"
import './global/index.js'
import myM from './global/MyElementUI/Message/index'
Vue.use(ElementUI);


Vue.prototype.$message = myM

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
