export default {
    path:'/explore',
    component: ()=> import('@/views/Explore/ExploreContainer'),
    module:'explore',
    children:[
      {
        path:'',
        component:()=>import('@/views/Explore/ExploreWrapper'),
        children:[
          {
            path:'',
            component:()=>import('./../../views/Explore/Explore.vue')
          },
          {
            path:'hot',
            component:()=>import('./../../views/Explore/Hot.vue')
          },
          {
            path:'search',
            name:'search',
            component:()=>import('./../../views/Explore/Search.vue')
          }
        ]
      }
    ]
  }