<script setup lang="ts">

import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()

</script>

<template>
    <!-- <v-banner v-show="alertStore.hasNewAlert" sticky color="error" icon="mdi-alert">
        <template v-slot:text>
            {{ alertStore.alertMessage }}
        </template>
<template v-slot:actions>
            <v-btn @click.prevent="alertStore.hasNewAlert = false">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </template>
</v-banner> -->
    <v-snackbar v-model="alertStore.hasNewAlert" timeout="3000">
        {{ alertStore.alertMessage }}
        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="alertStore.hasNewAlert = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<style scoped>
.sticky {
    position: sticky;
    top: 0
}
</style>