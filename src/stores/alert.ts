import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
  const alertMessage = ref('PLACEHOLDER ALERT')
  const hasNewAlert = ref(false)
  
  function setAlert(newAlertMessage: string) {
    alertMessage.value = newAlertMessage
    hasNewAlert.value = true
  }

  return { setAlert, alertMessage, hasNewAlert }
})
