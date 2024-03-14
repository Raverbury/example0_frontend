<script setup lang="ts">
import validator from 'validator'
import { ref } from 'vue';
import { useApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

//#region form values and rules
const usernameValue = ref('')
const usernameRules = [
    (usernameText: string) => {
        return !validator.isEmpty(usernameText) || 'Username must not be empty'
    },
    (usernameText: string) => {
        return (validator.isAscii(usernameText) && validator.isAlphanumeric(usernameText)) || 'Username must contain only alphanumeric characters'
    },
    (usernameText: string) => {
        const usernameLength = { max: 256 }
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
//#endregion

const alertStore = useAlertStore()
const authStore = useAuthStore()
const router = useRouter()
const apolloClient = useApolloClient()

const { mutate: sendMessage, loading, error, onDone, onError } = useMutation(gql`
    mutation registerAndLogin ($email: String!, $username: String!, $password: String!) {
        createUser (email: $email, name: $username, password: $password) {
            id
            name
            email
        }
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
    // explicit refetch here instead of using refetchQueries option since that runs before onDone is fired and we need to store the token first
    // same can be said for login form
    apolloClient.client.refetchQueries({
        include: ['getMe']
    })
    alertStore.setAlert('You have registered a new account.')
    router.push('/')
})

onError((param, ctx) => {
    alertStore.setAlert(param.message)
})

</script>

<template>
    <h1>
        <slot>Sign up now</slot>
    </h1><br />
    <v-sheet :height="'70vh'" :width="'50vw'">
        <v-form fast-fail
            @submit.prevent="sendMessage({ email: emailValue, username: usernameValue, password: passwordValue })">
            <v-text-field v-model="usernameValue" :rules="usernameRules" label="Username" type="text"></v-text-field>
            <v-text-field v-model="emailValue" :rules="emailRules" label="Email"></v-text-field>
            <v-text-field v-model="passwordValue" :rules="passwordRules" label="Password"
                :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                counter @click:append="showPassword = !showPassword">
            </v-text-field>
            <v-btn type="submit">Sign up</v-btn>
        </v-form>
    </v-sheet>
</template>