<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUserData();
});
</script>

<template>
  <div class="container-result">
    <img src="../assets/img/assets-2.png" alt="" />
    <div class="wrap-content">
      <h2>Congratulation</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, nam,
        possimus nobis impedit deserunt, sequi porro dolor dicta odio suscipit
        amet quis voluptas deleniti voluptate earum inventore recusandae quae
        tenetur?
      </p>
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
  color: #222222;
  font-size: 32px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
p {
  font-size: 14px;
  line-height: 1.2rem;
  margin-top: 1rem;
}
button {
  width: 100%;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .container-result {
    width: 450px;
  }
}
@media (min-width: 992px) {
  .container-result {
    width: 600px;
  }
}
</style>
