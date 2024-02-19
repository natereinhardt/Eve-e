<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@renderer/stores/auth.js'
const authStore = useAuthStore()
const { buildAuthUrl } = storeToRefs(authStore)

const props = defineProps({
  code: String
})

const url = buildAuthUrl.value
authStore.setUserCode(props.code)
console.log('Login.vue code:', props.code)
</script>

<template>
  <a :href="url">
    <button>Login to Eve</button>
  </a>
</template>
