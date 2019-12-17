import {prefix} from './../index'
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
            component:()=>import('./../../views/Explore/Explore.vue'),
            meta:{
              title: prefix +'探索'
            }
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