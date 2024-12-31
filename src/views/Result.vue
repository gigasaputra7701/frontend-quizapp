<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userData = computed(() => userStore.userData);
const idData = ref(userData.value._id);

const id = ref(route.params.id);
const result = ref("");

onMounted(async () => {
  userStore.fetchUserData();
  if (id.value === idData.value) {
    const res2 = await axios.get(
      `http://localhost:8000/api/result/${id.value}`
    );
    result.value = res2.data.resultTest;
  } else {
    router.push("/notFound");
  }
});
</script>

<template>
  <div class="container-result">
    <img src="../assets/img/assets-2.png" alt="" />
    <div class="wrap-content">
      <h2>Hasil Tes Anda</h2>
      <p class="parag">Skor: {{ result.score }}</p>
    </div>

    <button class="button">
      <router-link to="/">Kembali Ke Halaman Home</router-link>
    </button>
  </div>
</template>

<style scoped>
.container-result {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 320px;
}
img {
  width: 200px;
  height: auto;
  background-size: cover;
}
h2 {
  text-align: center;
  font-size: 32px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.parag {
  font-size: 14px;
  margin-bottom: 1rem;
}
button {
  width: 100%;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .container-result {
    width: 350px;
  }
}
@media (min-width: 992px) {
  .container-result {
    width: 400px;
  }
}
</style>
