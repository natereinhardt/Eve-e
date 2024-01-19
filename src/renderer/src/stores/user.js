import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {}
  }),
  actions: {
    async getAll() {
      return []
    }
  }
})
