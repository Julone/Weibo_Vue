export default {
    path:'/login',
    component: ()=> import('@/views/Login/LoginContainer'),
    children:[
      {
        path:'',
        name:'login',
        component:()=>import('@/views/Login/Login')
      },
      {
        path:'reg',
        name:'register',
        component:()=>import('@/views/Login/Reg')
      },
      {
        path:'/about',
        component:()=>import('./../views/About.vue')

      }
    ]
  }