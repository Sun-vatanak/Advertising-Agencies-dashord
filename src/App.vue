<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'

// You can add authentication state here if needed
const isAuthenticated = ref(false)

// Function to handle login
const handleLogin = () => {
  isAuthenticated.value = true
}
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>