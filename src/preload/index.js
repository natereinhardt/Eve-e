import { contextBridge } from 'electron'
const path = require('path')
import { electronAPI } from '@electron-toolkit/preload'
const crypto = require('crypto')
//const personDB = require(path.resolve('./src/database/PersonManager.js'))
// const init = require(path.resolve('./src/database/dbInit.js'))
// init.initDb()
// Custom APIs for renderer
const api = {}
const authAPi = require(path.resolve('./src/api/auth.js'))
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

global.clientId = '308a87f731b343f7bc74f72d0186ff1d'
global.codeVerifier = crypto
  .randomBytes(32)
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '')
global.codeChallenge = crypto
  .createHash('sha256')
  .update(global.codeVerifier)
  .digest('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '')

console.log('IN THE BUSS')
console.log('Client Id', global.clientId)
console.log('Code Verifier', global.codeVerifier)
console.log('Code Challenge', global.codeChallenge)

if (process.contextIsolated) {
  try {
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
