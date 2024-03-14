<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/auth'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

if (!route.query['page']) {
    router.replace({ name: 'view_public_todo', query: { page: '1' } })
}

const page = ref(+(route.query['page'] || '1'))

function makeSubtitleString(todo: any) {
    if (!authStore.token) {
        return `By user ${todo.user.name}#${todo.user.id}`
    }
    else {
        if (authStore.user.id == todo.user.id) {
            return 'By you'
        }
        else {
            return `By user ${todo.user.name}#${todo.user.id}`
        }
    }
}

watch(page, (page) => router.push({ name: 'view_public_todo', query: { page: page } }))

const { result: fetchResult, loading: queryLoading, onError: onFetchError } = useQuery(gql`
    query getPublicTodos ($page: Int!) {
        public_todos (page: $page) {
            data {
                id
                todo_title
                user {
                    id
                    name
                }
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
            }
        }
    }
`, { page: page }, { fetchPolicy: 'no-cache' })

</script>

<template>
    <div>
        <h2>View public todos</h2>
        <div v-if="!queryLoading">
            <v-list>
                <v-list-item v-for="todo in fetchResult?.public_todos?.data" :key="todo.id" link
                    :title="todo.todo_title" :subtitle="makeSubtitleString(todo)"
                    :to="{ name: 'view_todo', params: { id: todo.id } }"></v-list-item>
            </v-list>
            <v-pagination v-model="page" :length="fetchResult?.public_todos?.paginatorInfo.lastPage"></v-pagination>
        </div>
        <LoadingSpinner v-else></LoadingSpinner>
    </div>
</template>