import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import login from './login';
import user from './user'
var modules = { login,user }
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters:getters,
  modules: modules
})
