import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    userCode: null,
    returnUrl: null,
    secrets: null
  }),
  getters: {
    buildAuthUrl() {
      console.log('Building Auth Url')
      return window.authApi.buildAuthUrl()
    }
  },
  actions: {
    async setUserCode(code) {
      console.log('Setting User Code', code)
      this.userCode = code
    },
    async fetchAccessToken(code) {
      console.log('Fetching Access Token', code)
      const results = await window.authApi.getAccessToken(code)
      console.log(results)
      return results
    }
  }
})
