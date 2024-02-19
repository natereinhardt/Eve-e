import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, LoginView } from '@renderer/views/index.js'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    {
      path: '/eve_sso_callback',
      component: HomeView,
      props: (route) => ({ code: route.query.code, state: route.query.state })
    }
  ]
})
