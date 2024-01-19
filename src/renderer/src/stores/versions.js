import { defineStore, acceptHMRUpdate } from 'pinia'

export const versionsStore = defineStore('versionsStore', {
  state: () => ({
    versions: { ...window.electron.process.versions }
  }),
  getters: {
    version: (state) => state.versions
  },
  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(versionsStore, import.meta.hot))
}
