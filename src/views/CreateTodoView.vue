<script setup lang="ts">
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const alertStore = useAlertStore()

if (!authStore.token) {
    router.replace('/')
    alertStore.setAlert('You must be logged in to create a todo.')
}

const todo = ref({ todo_title: '', todo_text: '', is_public: false })

const { mutate: sendCreateTodo, onDone: onCreateDone } = useMutation(gql`
mutation createTodo ($todo_title: String!, $todo_text: String!, $is_public: Boolean!) {
    createTodo(todo_title: $todo_title, todo_text: $todo_text, is_public: $is_public) {
        id
    }
}
`, {
    refetchQueries: ['getMe']
})

onCreateDone((param) => {
    alertStore.setAlert('Todo created!')
    router.push(`/todo/${param.data.createTodo.id}`)
})

function createTodo() {
    sendCreateTodo({
        todo_title: todo.value.todo_title,
        todo_text: todo.value.todo_text,
        is_public: todo.value.is_public
    })
}
</script>

<template>
    <div>
        <h2>Create a new todo</h2>
        <v-form @submit.prevent="createTodo">
            <v-text-field v-model="todo.todo_title" title="Todo title" label="Title"
                placeholder="Your todo title"></v-text-field>
            <v-textarea v-model="todo.todo_text" title="Todo text" label="Body" placeholder="Your todo body" no-resize
                auto-grow></v-textarea>
            <v-btn-toggle mandatory shaped label v-model="todo.is_public">
                <v-btn color="warning" :value="true">
                    Public
                </v-btn>
                <v-btn color="info" :value="false">
                    Private
                </v-btn>
            </v-btn-toggle><br /><br />
            <v-btn type="submit">Save</v-btn>
        </v-form>
    </div>
</template>