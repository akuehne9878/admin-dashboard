import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Analytics from '@/views/Analytics.vue'
import Users from '@/views/Users.vue'
import Settings from '@/views/Settings.vue'

import Profiles from '@/views/Profiles.vue'
import ProfileDetail from '@/views/ProfileDetail.vue'
import Parameters from '@/views/Parameters.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/Orders.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/Reports.vue'),
    },
    { path: '/profiles', name: 'Profiles', component: Profiles },
    { path: '/profiles/:id', name: 'ProfileDetail', component: ProfileDetail },
    { path: '/parameters', name: 'Parameters', component: Parameters }


  ],
})

export default router