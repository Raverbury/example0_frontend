<script setup lang="ts">
import { ref } from 'vue';

    const someObject = ref({
        attr: 12,
        someFunc: function(hello: string) {
            console.log(hello);
        }
    });

    someObject.value.someFunc("Yolo!");
</script>

<template>
    <div>
        {{ someObject.attr }}
    </div>
</template>