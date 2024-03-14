<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import TheWelcome from '../components/TheWelcome.vue'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h2>Welcome to (Yet Another Generic) TodoApp</h2>
    <p v-if="!authStore.token">Log in to access more features</p>
    <p v-else>You can now create, view, edit and publish your own todos, or view other public todos created by other
      users</p>
    <!-- <TheWelcome /> -->
  </div>
</template>
