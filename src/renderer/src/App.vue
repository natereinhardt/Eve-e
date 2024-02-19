<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useAuthStore } from '@renderer/stores'

const authStore = useAuthStore()
</script>

<template>
  <div class="app-container bg-light">
    <nav v-show="authStore.userCode" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
      </div>
    </nav>
    <div class="container pt-4 pb-4">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less">
@import '@renderer/assets/css/styles.less';
</style>
