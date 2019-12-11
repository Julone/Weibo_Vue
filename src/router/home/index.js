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
    name:'home',
    component: () => import('@/views/Home/HomeWrapper.vue'),
    children: [
      {
        path: '',
        components: {
          follow: () => import('@/views/Home/Follow.vue'),
          default: () => import('@/views/Home/Home.vue'),
        },
      }, 
      {
        path: 'follow',
        name: 'home_follow',
        meta:{
          title:'关注人'
        },
        component: () => import('@/views/Home/Follow.vue')
      },
      {
        path: 'favor',
        name: 'home_favor',
        meta:{
          title:'收藏列表'
        },
        component: () => import('@/views/Home/Favor.vue')
      },
      {
        path: 'hot',
        name: 'home_hot',
        meta:{
          title:'最热微博'
        },
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