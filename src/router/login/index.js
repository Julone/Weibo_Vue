import {prefix} from './../index'
export default {
    path:'/login',
    component: ()=> import('@/views/Login/LoginContainer'),
    module:'login',
    children:[
      {
        path:'',
        name:'login',
        component:()=>import('@/views/Login/Login'),
        meta:{
          title: prefix + '登录'
        }
      },
      {
        path:'reg',
        name:'register',
        component:()=>import('@/views/Login/Reg'),
        meta:{
          title: prefix + '注册'
        }
      }
    ]
  }