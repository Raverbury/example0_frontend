import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authUserToken') || '')
  const user: Ref<UserModel> = ref({ id: localStorage.getItem('authUserId') || '', name: localStorage.getItem('authUserName') || '', email: localStorage.getItem('authUserEmail') || '' })

  function setAuth(newToken: string, newUser: UserModel) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('authUserToken', newToken)
    localStorage.setItem('authUserId', newUser.id)
    localStorage.setItem('authUserName', newUser.name)
    localStorage.setItem('authUserEmail', newUser.email)
  }

  return { setAuth, token, user }
})

interface UserModel {
  id: string,
  name: string,
  email: string
}
