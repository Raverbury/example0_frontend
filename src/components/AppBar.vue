<script setup lang="ts">
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

const authStore = useAuthStore()
const alertStore = useAlertStore()

const todoTitleFilter = ref('')

const filteredTodos = computed(() => {
    return result?.value?.me?.todos.filter((todo: any) => todo.todo_title.toLowerCase().includes(todoTitleFilter.value))
})

const theme = useTheme()

const { result, onError } = useQuery(gql`
    query getMe {
        me {
            id
            name
            email
            todos {
                id
                todo_title
            }
        }
    }
`)

const drawerIsOpen = ref(true)

onError((param, ctx) => {
    alertStore.setAlert(param.message)
})

</script>

<template>
    <!-- <v-card class="mx-auto" color="grey-lighten-3" max-width="448"> -->
    <v-app-bar color="teal-darken-3" image="https://picsum.photos/1280/720?random">

        <template v-slot:image>
            <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawerIsOpen = !drawerIsOpen"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
            <v-list-item title="TodoApp" class="mx-1" to="/"></v-list-item>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-list-item v-if="authStore.token" link title="Public todos" class="mx-1" :to="{name: 'view_public_todo', query: {'page': '1'}}"></v-list-item>
        <v-btn icon @click="() => { theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark' }">
            <v-icon :icon="theme.current.value.dark ? 'mdi-brightness-7' : 'mdi-brightness-3'"></v-icon>
        </v-btn>
        <v-divider vertical thickness="10" :color="!authStore.token ? 'red' : 'yellow'"></v-divider>
        <template v-if="!authStore.token">
            <v-list-item link title="Sign in" class="mx-1" to="/login"></v-list-item>
            <v-list-item title="Sign up" class="mx-1" to="/register"></v-list-item>
        </template>
        <template v-else>
            <v-list-item :title="`Welcome, ${authStore.user.name}`" class="mx-1"></v-list-item>
            <v-list-item link title="Sign out" class="mx-1" to="/logout"></v-list-item>
        </template>

    </v-app-bar>

    <v-navigation-drawer v-model="drawerIsOpen" temporary location="left">
        <v-divider thickness="10"></v-divider>
        <v-list-item v-if="!authStore.token" title="You must be signed in"></v-list-item>
        <div v-else>
            <v-list-item key="new" link :to="{ name: 'create_todo' }" append-icon="mdi-plus">Add a new
                todo</v-list-item>
            <v-divider thickness="10"></v-divider>
            <v-text-field v-model="todoTitleFilter" label="Your todos" placeholder="Fitler by title..."
                hide-details></v-text-field>
            <v-divider thickness="10"></v-divider>
            <v-list-item v-for="todo of filteredTodos" :key="todo.id" link :to="{ name: 'view_todo', params: { id: todo.id } }"
                :title="todo.todo_title">
            </v-list-item>
        </div>


    </v-navigation-drawer>
</template>

<style scoped></style>