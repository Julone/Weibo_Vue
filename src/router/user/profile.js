export default {
    path:'/profile',
    component: ()=> import('@/views/User/UserContainer'),
    module:'profile',
    children:[
      {
        path:'',
        component: ()=> import('@/views/User/UserWrapper'),
        children:[
          {
            path:'',
            name:'profile',
            component:()=>import('@/views/User/UserProfile')
          }
        ]
    }]
}