<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const userData = computed(() => userStore.userData);
const results = ref([]);

onMounted(async () => {
  await userStore.fetchUserData();

  if (
    userData.value.role === "recruiter" ||
    userData.value.role === "proctor" ||
    userData.value.role === "manager"
  ) {
    try {
      const response = await axios.get("http://localhost:8000/api/result", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Tambahkan "Bearer" di depan token
        },
      });

      results.value = response.data.dataResult;
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }
});
</script>

<template>
  <div v-if="results.length > 0">
    <h2>Hasil Tes</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Nama Tes</th>
          <th>Skor</th>
          <th>Tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result._id">
          <td>{{ result.user_id.username }}</td>
          <td>{{ result.user_id.email }}</td>
          <td>{{ result.test_id.test_name }}</td>
          <td>{{ result.score }}</td>
          <td>{{ new Date(result.completed_at).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="results.length === 0">
    <p>No results available.</p>
  </div>
</template>

<style scoped>
@import "../../assets/css/table.css";
</style>
