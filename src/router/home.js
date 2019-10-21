export default {
    path:'/',
    component:()=>import('@/views/Home/HomeContainer.vue'),
    redirect:'home',
    children:[
        {
            path:'home',
            component:()=>import('@/views/Home/HomeWrapper.vue'),
            children:[
              {
                path:'',
                name:'home',
                component:()=>import('@/views/Home/Home.vue'),
              },
              {
                path:'follow',
                name:'home_follow',
                component:()=>import('@/views/Home/Follow.vue')
              },
              {
                path:'detail/:id',
                name:'feed_detail',
                component:() =>import('@/views/Home/FeedDetail.vue')
              }
            ]
          },
          {
            path:'feed_send',
            name:'feed_send',
            component:()=>import('@/views/Home/FeedSend.vue')
          },
     
          
    ]
}