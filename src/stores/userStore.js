import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {
      _id: null,
      email: null,
      username: null,
      role: null,
    },
    isLoggedIn: false,
  }),
  actions: {
    async fetchUserData() {
      try {
        const response = await axios.get("http://localhost:8000/me", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          this.userData._id = response.data.user._id;
          this.userData.email = response.data.user.email;
          this.userData.username = response.data.user.username;
          this.userData.role = response.data.user.role;
          this.isLoggedIn = true;
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        window.location.href = "/login";
      }
    },
    async logout() {
      this.isLoggedIn = false;
    },
  },
});
