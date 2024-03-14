import './assets/main.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

// import '../node_modules/bootstrap/dist/css/bootstrap.css';

function makeHeaders() {
    const headers: { 'Authorization'?: string; 'Content-Type'?: string } = {}
    const authToken: string | null = localStorage.getItem('authUserToken')
    headers['Authorization'] = authToken ? `Bearer ${authToken}` : ''
    headers['Content-Type'] = 'application/json'
    return headers
}

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_GRAPHQL_API,
    fetch: (input: RequestInfo | URL, init: RequestInit | undefined) => {
        if (init) { init.headers = makeHeaders() }
        return fetch(input, init)
    }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})

const vuetify = createVuetify(
    {
        theme: {
            defaultTheme: 'light'
        },
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
    }
)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
