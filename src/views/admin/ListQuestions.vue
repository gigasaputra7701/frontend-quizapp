<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const userData = computed(() => userStore.userData);
const tests = ref([]);

onMounted(async () => {
  await userStore.fetchUserData();

  if (
    userData.value.role === "recruiter" ||
    userData.value.role === "proctor" ||
    userData.value.role === "manager"
  ) {
    try {
      const response = await axios.get("http://localhost:8000/api/test", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      tests.value = response.data.test;
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  }
});
</script>
<template>
  <div class="container">
    <h2>Daftar Soal</h2>
    <div v-for="test in tests" :key="test._id" class="test-container">
      <p>Nama Tes : {{ test.test_name }}</p>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Pertanyaan</th>
            <th>Opsi Jawaban</th>
            <th>Jawaban</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in test.questions" :key="question.question_id">
            <td>{{ question.question_id }}</td>
            <td>{{ question.question_text }}</td>
            <td>
              <ul>
                <li v-for="option in question.options" :key="option">
                  {{ option }}
                </li>
              </ul>
            </td>
            <td>{{ question.correct_answer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/table.css";
</style>
