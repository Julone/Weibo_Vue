import {prefix} from  './../index'
export default {
  path: '/',
  component: () => import('@/views/Home/HomeContainer.vue'),
  module: 'home',
  children: [
    {
      path:'',
      redirect:{
        path:'home'
      }
    },
    {
    path: 'home',
    component: () => import('@/views/Home/HomeWrapper.vue'),
    children: [
      {
        path: '',
        name:'home',
        components: {
          follow: () => import('@/views/Home/Follow.vue'),
          default: () => import('@/views/Home/Home.vue'),
        },
      }, 
      {
        path: 'follow',
        name: 'home_follow',
        meta:{
          title:prefix + '关注中心'
        },
        component: () => import('@/views/Home/Follow.vue')
      },
      {
        path: 'favor',
        name: 'home_favor',
        meta:{
          title:prefix + '收藏列表'
        },
        component: () => import('@/views/Home/Favor.vue')
      },
      {
        path: 'hot',
        name: 'home_hot',
        meta:{
          title:prefix+'最热微博'
        },
        alias:['/hot'],
        component: () => import('@/views/Home/Hot.vue')
      },
      {
        path: 'detail/:id',
        name: 'feed_detail',
        component: () => import('@/views/Home/FeedDetail.vue')
      }
    
    ]

  }]
}