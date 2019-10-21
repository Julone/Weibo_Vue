export default {
    path:'/user',
    component: ()=> import('@/views/User/UserContainer'),
    children:[
      
      {
        path:'info',
        name:'userinfo',
        component:()=>import('@/views/User/UserInfo')
      },
      {
        path:'changePwd',
        name:'changePwd',
        component:()=>import('@/views/User/UserPwd')
      },
      {
        path:':user_id',
        name:'user',
        component:()=>import('@/views/User/User'),
      },
    ]
  }