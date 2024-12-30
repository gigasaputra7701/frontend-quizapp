<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const users = ref([]);

onMounted(async () => {
  await userStore.fetchUserData();

  if (
    userData.value.role === "recruiter" ||
    userData.value.role === "proctor" ||
    userData.value.role === "manager"
  ) {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      users.value = response.data.users;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
});
</script>

<template>
  <div class="container">
    <h2>Daftar Pengguna</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Tanggal Daftar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ new Date(user.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "../../assets/css/table.css";
</style>
