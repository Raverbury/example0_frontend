<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const todoId = computed(() => {
    return route.params?.id || 0
})

const { result, loading } = useQuery(gql`
    query getTodo ($id: ID!) {
        todo (id: $id) {
            id
            todo_title
            todo_text
        }
    }
`, { id: todoId }, { fetchPolicy: 'no-cache' })
</script>

<template>
    <div v-if="!loading">
        <h1>This is the todo view</h1>
        {{ route.params.id }}
        {{ result?.todo?.todo_title }}
        {{ result?.todo?.todo_text }}
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
</template>