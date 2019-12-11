import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL
})

router.beforeEach((to, from, next) => {
  if(to.meta.content){
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }else{
    document.title = 'Phantom'
  }
  next()
});

export default router;