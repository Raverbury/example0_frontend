<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore()

</script>

<template>
    <!-- <v-card class="mx-auto" color="grey-lighten-3" max-width="448"> -->
    <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
            <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title><RouterLink style="text-decoration: none; color: inherit;" to="/">Example site name</RouterLink></v-app-bar-title>

        <v-spacer></v-spacer>

        <RouterLink class="v-btn mx-1" to="/pubtodos">Public todos</RouterLink>
        <RouterLink class="v-btn mx-1" to="https://google.com">Sell your soul</RouterLink>
        <template v-if="!authStore.token">
            <RouterLink class="v-btn mx-1" to="/nowhere">Log in</RouterLink>
            <RouterLink class="v-btn mx-1" to="/register">Register</RouterLink>
        </template>
        <template v-else>
            <RouterLink class="v-btn mx-1" to="/nowhere">Welcome, {{ authStore.user.name }}</RouterLink>
        </template>


    </v-app-bar>

    <!-- <v-main>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="n in 4" :key="n" cols="12">
                    <v-card :subtitle="`Subtitle for Content ${n}`" :title="`Content ${n}`"
                        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"></v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main> -->
    <!-- </v-card> -->
</template>

<style scoped>
</style>