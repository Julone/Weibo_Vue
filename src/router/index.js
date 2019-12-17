import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const config = {
  mode: 'history',
  base: process.env.BASE_URL
};
const router =  new Router(config);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }else{
    document.title = 'Phantom微博 - 分享你的新鲜事'
  }
  next()
});
export const createRouter = () => new Router(config);
export default router;
export const prefix =  'Phantom微博 - ';