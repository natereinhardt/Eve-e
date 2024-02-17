<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@renderer/stores/auth.js'
const authStore = useAuthStore()
const { buildAuthUrl } = storeToRefs(authStore)
const props = defineProps({
  code: String
})
console.log('code', props.code)
const url = buildAuthUrl.value
</script>

<template>
  <a :href="url">
    <button>Login to Eve</button>
  </a>
</template>
