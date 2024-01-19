import { contextBridge } from 'electron'
const path = require('path')
import { electronAPI } from '@electron-toolkit/preload'
//const personDB = require(path.resolve('./src/database/PersonManager.js'))
const init = require(path.resolve('./src/database/dbInit.js'))
// Custom APIs for renderer
const api = {}
const authAPi = require(path.resolve('./src/api/auth.js'))

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    init.initDb()
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('authApi', authAPi)
    //contextBridge.exposeInMainWorld('sqlite', personDB)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
