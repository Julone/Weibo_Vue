import { prefix } from './../index'
export default {
    path:'/user',
    component: ()=> import('@/views/User/UserContainer'),
    module:'user',
    children:[
      {
        path:'',
        component: ()=> import('@/views/User/UserWrapper'),
        children:[
          {
            path:'follow',
            name:'user_follow',
            component:()=>import('@/views/User/UserFollow'),
            meta:{
              title: prefix + '关注列表'
            }
          },
          {
            path:'fans',
            name:'user_fans',
            component:()=>import('@/views/User/UserFollow'),
            meta:{
              title: prefix + '粉丝列表'
            }
          },
          {
            path:':user_id',
            name:'user_center',
            component:()=>import('@/views/User/UserCenter'),
            meta:{
              title: prefix + '用户主页'
            }
          },
        ]
      }
    ]
  }