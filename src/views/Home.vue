<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
    axios.get('https://88d3-38-25-15-22.sa.ngrok.io/usuarios')
        .then(response => console.log(response.data));
});

</script>

<template>
    <h1>home</h1>
</template>
