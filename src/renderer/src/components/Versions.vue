<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
    <li class="v8-version">V8 v{{ versions.v8 }}</li>
  </ul>
</template>

<script setup>
//import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { versionsStore } from '@renderer/stores/versions.js'
const { versions } = storeToRefs(versionsStore())
</script>
