export default {
  path: '/admin',
  component: () => import('@/views/Admin/AdminContainer'),
  module: 'admin',
  children: [{
    path: '',
    component: () => import('@/views/Admin/AdminWrapper'),
    children: [
      {
        path:'',
        redirect:{path:'weibo'}
      },
      {
        path: 'weibo',
        component: () => import('@/views/Admin/Weibo/index.vue'),
        children: [{
            path: '',
            component: () => import('@/views/Admin/Weibo/Weibo.vue')
          },
          {
            path: 'reply',
            component: () => import('@/views/Admin/Weibo/Reply.vue')
          },
        ]
      },
      {
        path: 'report',
        component: () => import('@/views/Admin/Report.vue')
      },
      {
        path: 'users',
        component: () => import('@/views/Admin/Users.vue')
      },
      {
        path: 'topic',
        component: () => import('@/views/Admin/Topic.vue')
      }
    ]
  }]
}