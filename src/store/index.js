import Vue from 'vue'
import Vuex from 'vuex'
import state from './index/state';
import mutations from './index/mutations'
import actions from './index/actions'
//global_getters
import getters from './getters'
//modules
import login from './login';
import user from './user';
import report from './report';
import swiper from './swiper';
import admin from './admin';

const modules = { login,user,swiper,report,admin }
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
