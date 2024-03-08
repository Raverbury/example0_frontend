<script setup lang="ts">
import validator from 'validator'
import { ref } from 'vue';
import { useApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

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

const alertStore = useAlertStore()
const authStore = useAuthStore()
const router = useRouter()
const apolloClient = useApolloClient()

const { mutate: sendMessage, loading, error, onDone, onError } = useMutation(gql`
    mutation login ($email: String!, $password: String!) {
        logIn (email: $email, password: $password) {
            token
            user {
                id
                name
                email
            }
        }
    }
`)

onDone((result) => {
    authStore.setAuth(result.data?.logIn.token, result.data?.logIn.user)
    apolloClient.client.refetchQueries({
        include: ['getMe']
    })
    router.push('/')
})

onError((param, ctx) => {
    alertStore.setAlert(param.message)
})

</script>

<template>
    <h1>
        <slot>Sign in now</slot>
    </h1><br />
    <v-sheet :height="'70vh'" :width="'50vw'">
        <v-form fast-fail @submit.prevent="sendMessage({ email: emailValue, password: passwordValue })">
            <v-text-field v-model="emailValue" :rules="emailRules" label="Email"></v-text-field>
            <v-text-field v-model="passwordValue" :rules="passwordRules" label="Password"
                :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                counter @click:append="showPassword = !showPassword">
            </v-text-field>
            <v-btn type="submit">Sign in</v-btn>
        </v-form>
    </v-sheet>
</template>