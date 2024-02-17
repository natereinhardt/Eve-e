import { defineStore } from 'pinia'

import { router } from '@renderer/helpers'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: 'http://localhost:5173/eve_sso_callback/',
    clientId: '308a87f731b343f7bc74f72d0186ff1d',
    state: 'login'
  }),
  getters: {
    buildAuthUrl() {
      const url = new URL('https://login.eveonline.com/v2/oauth/authorize/')
      const params = new URLSearchParams({
        response_type: 'code',
        redirect_uri: 'http://localhost:5173/eve_sso_callback/',
        client_id: '308a87f731b343f7bc74f72d0186ff1d',
        scope: 'publicData',
        state: 'yolo'
      })
      url.search = params.toString()
      return url.toString()
    }
  },
  actions: {
    async login(username, password) {
      console.log('login', username, password)

      const user = await window.authApi.authenticate(username, password)

      // update pinia state
      this.user = user

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))

      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/')
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
})
