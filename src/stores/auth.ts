import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const user = ref({})
  
  function setAuth(newToken, newUser) {
    token.value = newToken
    user.value = newUser
  }

  return { setAuth, token, user }
})
