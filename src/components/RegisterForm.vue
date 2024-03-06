<script setup lang="ts">
import { VForm, VTextField, VBtn, VSheet } from 'vuetify/components'
import validator from 'validator'
import { ref } from 'vue';

const usernameValue = ref('')
const usernameRules = [
    (usernameText: string) => {
        return !validator.isEmpty(usernameText) || 'Username must not be empty'
    },
    (usernameText: string) => {
        return (validator.isAscii(usernameText) && validator.isAlphanumeric(usernameText)) || 'Username must contain only alphanumeric characters'
    },
    (usernameText: string) => {
        const usernameLength = {max: 256}
        return validator.isLength(usernameText, usernameLength) || `Username cannot be longer than ${usernameLength.max} characters`
    }
]

const emailValue = ref('')
const emailRules = [
    (emailText: string) => {
        return !validator.isEmpty(emailText) || 'Email must not be empty'
    },
    (emailText: string) => {
        return validator.isEmail(emailText) || 'Email must resemble an email address'
    }
]

const passwordValue = ref('')
const showPassword = ref(false)
const passwordRules = [
    (passwordText: string) => {
        const passwordLengths = { min: 8, max: 256 }
        return validator.isLength(passwordText, passwordLengths) || `Password must be between ${passwordLengths.min} and ${passwordLengths.max} characters`
    },
    (passwordText: string) => {
        return validator.isStrongPassword(passwordText, { minLowercase: 1, minSymbols: 1, minNumbers: 1, minUppercase: 1 }) || `Password must have at least 1 of each: uppercase letter, lowercase letter, symbol, number`
    },
]

</script>

<template>
    <h1><slot>Sign up now</slot></h1><br/>
    <VSheet :height="'70vh'" :width="'50vw'">
        <VForm fast-fail @submit.prevent>
            <VTextField v-model="usernameValue" :rules="usernameRules" label="Username"></VTextField>
            <VTextField v-model="emailValue" :rules="emailRules" label="Email"></VTextField>
            <VTextField v-model="passwordValue" :rules="passwordRules" label="Password"
                :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                counter @click:append="showPassword = !showPassword">
            </VTextField>
            <VBtn type="submit" block>Sign up</VBtn>
        </VForm>
    </VSheet>
</template>