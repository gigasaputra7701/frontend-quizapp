<script setup>
import { ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
const getMainClass = ref("default-main");

watch(
  () => route.path,
  (newPath) => {
    getMainClass.value =
      newPath === "/register" || newPath === "/login"
        ? "register-main"
        : "default-main";
  },
  { immediate: true }
);
</script>

<template>
  <Navbar />
  <main id="app" :class="getMainClass"><RouterView /></main>
  <Footer />
</template>

<style scoped>
.default-main {
  margin: 0 auto;
  max-width: 900px;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.register-main {
  padding: 0;
}
</style>
