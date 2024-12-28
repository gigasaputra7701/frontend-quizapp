<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import isLoading from "../components/isLoading.vue";
const dataTest = ref({});

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000");
    dataTest.value = response.data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
<template>
  <section class="container-home">
    <img src="@/assets/img/assets.png" class="imgAssets" />
    <h1 class="title">{{ dataTest.test_name }}</h1>
    <p class="parag">{{ dataTest.description }}</p>
    <ul>
      <li class="bold">*Preapare yourself and device</li>
      <li class="bold">*Test only can take 1x</li>
    </ul>
    <router-link class="button" to="/test">Mulai Test</router-link>
  </section>
  <!-- <isLoading /> -->
</template>

<style scoped>
.imgAssets {
  height: 100%;
  width: 200px;
  background-size: cover;
  object-fit: cover;
}
.container-home {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  width: 600px;
  gap: 1rem;
}
.parag {
  margin-top: 0.6rem;
}
li {
  margin-bottom: 0.6rem;
}
</style>
