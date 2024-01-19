import { defineStore, acceptHMRUpdate } from 'pinia'

export const versionsStore = defineStore('versionsStore', {
  state: () => ({
    versions: { ...window.electron.process.versions }
  }),
  getters: {
    message: (state) => state.version
  },
  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(versionsStore, import.meta.hot))
}
