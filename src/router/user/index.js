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
            component:()=>import('@/views/User/UserFollow')
          },
          {
            path:'fans',
            name:'user_fans',
            component:()=>import('@/views/User/UserFollow')
          },
          {
            path:':user_id',
            name:'user_center',
            component:()=>import('@/views/User/UserCenter')
          },
        ]
      }
    ]
  }