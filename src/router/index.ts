import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'log_in',
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/logout',
      name: 'log_out',
      component: () => import('../views/LogOutView.vue')
    },
    {
      path: '/todos/new',
      name: 'create_todo',
      component: () => import('../views/CreateTodoView.vue')
    },
    {
      path: '/todos',
      name: 'view_public_todo',
      component: () => import('../views/PublicTodoView.vue')
    },
    {
      path: '/todo/:id',
      name: 'view_todo',
      component: () => import('../views/TodoView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'Error', component: ErrorView },
  ]
})

export default router
