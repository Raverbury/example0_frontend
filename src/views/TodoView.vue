<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const todoId = computed(() => {
    return route.params?.id || 0
})

const { result, loading, onError: onFetchError } = useQuery(gql`
    query getTodo ($id: ID!) {
        todo (id: $id) {
            id
            todo_title
            todo_text
            is_public
            user {
                id
            }
        }
    }
`, { id: todoId }, { fetchPolicy: 'no-cache' })

const { mutate: sendUpdateTodo, onDone: onMutateDone } = useMutation(gql`
mutation updateTodo ($id: ID!, $todo_title: String!, $todo_text: String!, $is_public: Boolean!) {
    updateTodo(id: $id, todo_title: $todo_title, todo_text: $todo_text, is_public: $is_public) {
        id
        todo_title
        todo_text
        is_public
    }
}
`, {
    refetchQueries: ['getMe']
})

const alertStore = useAlertStore()

onFetchError((param) => {
    if (param.message.includes('This action is unauthorized.') || param.message.includes('No query result')) {
        router.replace('/')
    }
    // alertStore.setAlert(param.message)
})

onMutateDone(_ => {
    alertStore.setAlert('Todo saved!')
})

function updateTodo() {
    sendUpdateTodo({
        id: todoId.value,
        todo_title: result.value.todo.todo_title,
        todo_text: result.value.todo.todo_text,
        is_public: result.value.todo.is_public
    })
}

if (!authStore.token) {
    router.replace('/')
    alertStore.setAlert('You must be logged in to view a todo.')
}
</script>

<template>
    <div v-if="!loading && result">
        <v-form @submit.prevent="updateTodo">
            <v-text-field v-model="result.todo.todo_title" title="Todo title" label="Title"
                :disabled="authStore.user.id != result.todo.user.id" placeholder="Your todo title"></v-text-field>
            <v-textarea v-model="result.todo.todo_text" title="Todo text" label="Body" placeholder="Your todo body"
                :disabled="authStore.user.id != result.todo.user.id" no-resize auto-grow></v-textarea>
            <v-btn-toggle mandatory shaped label v-model="result.todo.is_public"
                :disabled="authStore.user.id != result.todo.user.id">
                <v-btn color="warning" :value="true">
                    Public
                </v-btn>
                <v-btn color="info" :value="false">
                    Private
                </v-btn>
            </v-btn-toggle><br /><br />
            <v-btn type="submit" v-show="authStore.user.id == result.todo.user.id">Save</v-btn>
        </v-form>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
</template>