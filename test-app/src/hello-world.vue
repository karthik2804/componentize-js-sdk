<template>
    <div v-if="count">
        Hello World from Vue SSR!
    </div>
    <button @click="count++">{{ count }}</button>
</template>


<script>
export default {
    data() {
        return {
            count: 0
        };
    },
    name: 'hello-world',
};
</script>