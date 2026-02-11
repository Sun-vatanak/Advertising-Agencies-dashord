import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../Login/login.vue'
import Dashboard from '../dashboard/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Add this if you want to protect the route
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Optional: Add navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  // If route requires auth and user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  // If user is authenticated and tries to access login, redirect to dashboard
  else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } 
  else {
    next()
  }
})

export default router