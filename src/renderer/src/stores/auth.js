import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    userCode: null,
    returnUrl: null
  }),
  getters: {
    buildAuthUrl() {
      return window.authApi.buildAuthUrl()
    }
  },
  actions: {
    async setUserCode(code) {
      console.log('Setting User Code', code)
      this.userCode = code
    }
  }
})
