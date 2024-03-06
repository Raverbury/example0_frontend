<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
  <div class="aabout">
    <h1>This is an about page</h1>
    <br/>
    <RegisterForm>Register an account</RegisterForm>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
