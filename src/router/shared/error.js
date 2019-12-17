export default {
    path:'*',
    component:()=>import('@/views/Error/ErrorContainer.vue'),
    children:[
        {
            path:'',
            name:'error',
            component:()=>import('@/views/Error/Error.vue'),
        },
       
    ]
}