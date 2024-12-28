<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main id="app"><RouterView /></main>
</template>

<style scoped>
#app {
  margin: 0 auto;
  max-width: 900px;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
