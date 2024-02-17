import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@renderer/stores/auth.js'
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

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/login'
  }
})
