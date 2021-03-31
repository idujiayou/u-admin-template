import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import AppBody from '@/layout/components/app-body'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: 'lists2',
        component: AppBody,
        name: 'lists2',
        meta: { title: '列表', icon: 'dashboard'},
        children: [
          {
            path: '/lists',
            component: () => import('@/views/lists/index'),
            name: 'lists',
            meta: { title: '列表', icon: 'dashboard'},
          },
          {
            path: '/test',
            component: () => import('@/views/test/index'),
            name: 'test',
            meta: { title: '测试', icon: 'dashboard' }
          }
        ]
      }
      
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        name: 'redirect',
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
