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
        redirect:{path:'report'}
      },
      {
        path: 'weibo',
        component: () => import('@/views/Admin/Weibo/Weibo.vue'),
        meta:{
          title: 'Admin - 微博管理'
        }
      },
      {
        path: 'reply',
        component: () => import('@/views/Admin/Weibo/Reply.vue'),
        meta:{
          title: 'Admin - 评论管理'
        }
      },
      {
        path: 'report',
        component: () => import('@/views/Admin/Report.vue'),
        meta:{
          title: 'Admin - 举报管理'
        }
      },
      {
        path: 'users',
        component: () => import('@/views/Admin/Users.vue'),
        meta:{
          title: 'Admin - 用户管理'
        }
      },
      {
        path: 'topic',
        component: () => import('@/views/Admin/Topic.vue'),
        meta:{
          title: 'Admin - 话题管理'
        }
      }
    ]
  }]
}