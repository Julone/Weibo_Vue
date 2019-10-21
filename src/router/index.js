import Vue from 'vue'
import Router from 'vue-router'
import login from './login'
import home from './home'
import user from './user'
import error from './error'
var routes = new Set([home,login,user,error])


Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
