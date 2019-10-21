export default {
    path:'*',
    component:()=>import('@/views/Error/ErrorContainer.vue'),
    children:[
        {
            path:'/error',
            name:'error',
            component:() => import('@/views/Error/Error.vue')
        },
        {
            path:'',
            name:'notFound',
            component:()=>import('@/views/Error/NotFound.vue')
        },
       
    ]
}