<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted, computed } from "vue";
import router from "@/router/index.js";
import { useUserStore } from "@/stores/userStore";

const userAgent = navigator.userAgent;
const isOnline = ref(navigator.onLine);
const isPopupVisible = ref(false);
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const userData = computed(() => userStore.userData);

const updateStatus = () => {
  isOnline.value = navigator.onLine;
};

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};

const logout = async () => {
  localStorage.setItem("token", null);
  userStore.logout();
  await router.push("/login");
};

onMounted(async () => {
  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
  // if (!isLoggedIn.value) {
  //   await router.push("/login");
  // }
});

onUnmounted(() => {
  window.removeEventListener("online", updateStatus);
  window.removeEventListener("offline", updateStatus);
});
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <router-link
        v-if="isLoggedIn && userData.role != 'participant'"
        class="Hello button"
        to="/admin/home"
      >
        Hi, {{ userData.role }}
      </router-link>
      <router-link v-else to="/">
        <img src="@/assets/img/logo.png" class="logo-nav" />
      </router-link>
      <div class="nav-link-group">
        <!-- Signal n Regist Btn -->
        <div>
          <button
            v-if="isLoggedIn && userData.role === 'participant'"
            class="button"
            @click="togglePopup"
          >
            <svg
              v-if="!isOnline"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.3751 16.9583L35.4584 13.875C29.708 8.12457 21.7838 5.9354 14.3376 7.2304L18.3151 11.2079C23.4026 11.1771 28.5055 13.0887 32.3751 16.9583ZM29.2917 20.0417C27.673 18.4302 25.7131 17.2027 23.5567 16.4496L28.2126 21.1054L29.2917 20.0417ZM13.8751 26.2083L18.5001 30.8333L23.1251 26.2083C22.5183 25.5999 21.7974 25.1172 21.0038 24.7879C20.2102 24.4585 19.3593 24.289 18.5001 24.289C17.6408 24.289 16.79 24.4585 15.9964 24.7879C15.2027 25.1172 14.4819 25.5999 13.8751 26.2083ZM5.25717 2.52832L3.08341 4.70207L7.7855 9.40415C5.53467 10.5296 3.42258 12.0096 1.54175 13.875L4.62508 16.9583C6.52133 15.0621 8.7105 13.6283 11.0538 12.6725L14.5072 16.1258C11.9356 16.8096 9.59029 18.1604 7.70842 20.0417L10.7917 23.125C12.7905 21.1181 15.4982 19.9774 18.3305 19.9492L29.2455 30.8642L31.4192 28.6904L5.25717 2.52832Z"
                fill="white"
              />
            </svg>
            <svg
              v-else
              width="31"
              height="32"
              viewBox="0 0 36 37"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 14L4.5 17C11.955 9.54502 24.045 9.54502 31.5 17L34.5 14C25.395 4.89501 10.62 4.89501 1.5 14ZM13.5 26L18 30.5L22.5 26C21.9096 25.4081 21.2082 24.9384 20.4361 24.618C19.6639 24.2975 18.836 24.1325 18 24.1325C17.164 24.1325 16.3361 24.2975 15.5639 24.618C14.7918 24.9384 14.0904 25.4081 13.5 26ZM7.5 20L10.5 23C12.4897 21.012 15.1873 19.8952 18 19.8952C20.8127 19.8952 23.5103 21.012 25.5 23L28.5 20C22.71 14.21 13.305 14.21 7.5 20Z"
                fill="white"
              />
            </svg>
          </button>
          <button class="button" v-if="!isLoggedIn">
            <router-link to="register">Register</router-link>
          </button>
        </div>
        <div v-if="isLoggedIn && userData.role != 'participant'">
          <router-link to="/admin/questions" class="button btn-nav"
            >Data Soal</router-link
          >
          <router-link to="/admin/users" class="button btn-nav"
            >Data Pengguna</router-link
          >
        </div>

        <button v-if="isLoggedIn" @click="logout" class="button btn-logout">
          <p class="label-logout">Logout</p>
          <svg
            width="25"
            height="26"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.7002 9.33342C3.7002 7.69791 4.3499 6.1294 5.50637 4.97292C6.66284 3.81645 8.23136 3.16675 9.86686 3.16675H16.0335C16.3606 3.16675 16.6743 3.29669 16.9056 3.52798C17.1369 3.75928 17.2669 4.07298 17.2669 4.40008C17.2669 4.72718 17.1369 5.04088 16.9056 5.27218C16.6743 5.50347 16.3606 5.63341 16.0335 5.63341H9.86686C8.88556 5.63341 7.94445 6.02324 7.25057 6.71712C6.55668 7.411 6.16686 8.35211 6.16686 9.33342V21.6667C6.16686 22.648 6.55668 23.5892 7.25057 24.283C7.94445 24.9769 8.88556 25.3667 9.86686 25.3667H16.0335C16.3606 25.3667 16.6743 25.4967 16.9056 25.728C17.1369 25.9593 17.2669 26.273 17.2669 26.6001C17.2669 26.9272 17.1369 27.2409 16.9056 27.4722C16.6743 27.7035 16.3606 27.8334 16.0335 27.8334H9.86686C8.23136 27.8334 6.66284 27.1837 5.50637 26.0272C4.3499 24.8708 3.7002 23.3022 3.7002 21.6667V9.33342Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.8465 9.72316C17.9573 9.60487 18.0903 9.50956 18.2379 9.44269C18.3855 9.37582 18.5448 9.33868 18.7068 9.33342C18.8687 9.32815 19.0301 9.35485 19.1818 9.41198C19.3334 9.46912 19.4723 9.55558 19.5905 9.66642L25.5105 15.2164C25.6337 15.3318 25.7319 15.4712 25.7991 15.6261C25.8662 15.781 25.9009 15.948 25.9009 16.1168C25.9009 16.2856 25.8662 16.4526 25.7991 16.6074C25.7319 16.7623 25.6337 16.9017 25.5105 17.0171L19.5905 22.5671C19.4722 22.6779 19.3333 22.7643 19.1817 22.8214C19.0301 22.8785 18.8687 22.9052 18.7068 22.8999C18.5448 22.8946 18.3855 22.8575 18.2379 22.7907C18.0903 22.7238 17.9573 22.6286 17.8465 22.5104C17.7358 22.3921 17.6494 22.2532 17.5922 22.1016C17.5351 21.95 17.5085 21.7886 17.5137 21.6266C17.519 21.4647 17.5561 21.3054 17.623 21.1578C17.6898 21.0102 17.785 20.8772 17.9033 20.7664L21.5478 17.3501H9.86688C9.53978 17.3501 9.22607 17.2201 8.99478 16.9889C8.76349 16.7576 8.63354 16.4439 8.63354 16.1168C8.63354 15.7897 8.76349 15.476 8.99478 15.2447C9.22607 15.0134 9.53978 14.8834 9.86688 14.8834H21.5478L17.9033 11.4671C17.785 11.3563 17.6897 11.2234 17.6228 11.0758C17.5559 10.9282 17.5188 10.7688 17.5135 10.6069C17.5083 10.4449 17.535 10.2835 17.5921 10.1319C17.6492 9.98025 17.7357 9.84136 17.8465 9.72316Z"
              fill="white"
            />
          </svg>
        </button>
        <button v-else class="button">
          <router-link to="/login" class="btn-logout"
            >Login
            <svg
              width="25"
              height="26"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.7002 9.33342C3.7002 7.69791 4.3499 6.1294 5.50637 4.97292C6.66284 3.81645 8.23136 3.16675 9.86686 3.16675H16.0335C16.3606 3.16675 16.6743 3.29669 16.9056 3.52798C17.1369 3.75928 17.2669 4.07298 17.2669 4.40008C17.2669 4.72718 17.1369 5.04088 16.9056 5.27218C16.6743 5.50347 16.3606 5.63341 16.0335 5.63341H9.86686C8.88556 5.63341 7.94445 6.02324 7.25057 6.71712C6.55668 7.411 6.16686 8.35211 6.16686 9.33342V21.6667C6.16686 22.648 6.55668 23.5892 7.25057 24.283C7.94445 24.9769 8.88556 25.3667 9.86686 25.3667H16.0335C16.3606 25.3667 16.6743 25.4967 16.9056 25.728C17.1369 25.9593 17.2669 26.273 17.2669 26.6001C17.2669 26.9272 17.1369 27.2409 16.9056 27.4722C16.6743 27.7035 16.3606 27.8334 16.0335 27.8334H9.86686C8.23136 27.8334 6.66284 27.1837 5.50637 26.0272C4.3499 24.8708 3.7002 23.3022 3.7002 21.6667V9.33342Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8465 9.72316C17.9573 9.60487 18.0903 9.50956 18.2379 9.44269C18.3855 9.37582 18.5448 9.33868 18.7068 9.33342C18.8687 9.32815 19.0301 9.35485 19.1818 9.41198C19.3334 9.46912 19.4723 9.55558 19.5905 9.66642L25.5105 15.2164C25.6337 15.3318 25.7319 15.4712 25.7991 15.6261C25.8662 15.781 25.9009 15.948 25.9009 16.1168C25.9009 16.2856 25.8662 16.4526 25.7991 16.6074C25.7319 16.7623 25.6337 16.9017 25.5105 17.0171L19.5905 22.5671C19.4722 22.6779 19.3333 22.7643 19.1817 22.8214C19.0301 22.8785 18.8687 22.9052 18.7068 22.8999C18.5448 22.8946 18.3855 22.8575 18.2379 22.7907C18.0903 22.7238 17.9573 22.6286 17.8465 22.5104C17.7358 22.3921 17.6494 22.2532 17.5922 22.1016C17.5351 21.95 17.5085 21.7886 17.5137 21.6266C17.519 21.4647 17.5561 21.3054 17.623 21.1578C17.6898 21.0102 17.785 20.8772 17.9033 20.7664L21.5478 17.3501H9.86688C9.53978 17.3501 9.22607 17.2201 8.99478 16.9889C8.76349 16.7576 8.63354 16.4439 8.63354 16.1168C8.63354 15.7897 8.76349 15.476 8.99478 15.2447C9.22607 15.0134 9.53978 14.8834 9.86688 14.8834H21.5478L17.9033 11.4671C17.785 11.3563 17.6897 11.2234 17.6228 11.0758C17.5559 10.9282 17.5188 10.7688 17.5135 10.6069C17.5083 10.4449 17.535 10.2835 17.5921 10.1319C17.6492 9.98025 17.7357 9.84136 17.8465 9.72316Z"
                fill="white"
              /></svg
          ></router-link>
        </button>
      </div>
      <div class="popUp" :class="{ active: isPopupVisible }">
        <p>User Agent : {{ userAgent }}</p>
        <p>Status : {{ isOnline ? "Connect" : "Disconnect" }}</p>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.label-logout {
  display: none;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #222222;
  height: 70px;
  display: flex;
  align-items: center;
}
.container {
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
}
.logo-nav {
  height: 30px;
}
svg {
  height: 22px;
  width: 100%;
}
.nav-link-group {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  align-items: center;
}

.button {
  padding: 1rem;
}
.popUp {
  z-index: 10;
  position: absolute;
  width: 180px;
  height: auto;
  padding: 1rem;
  top: 100%;
  right: 10.5%;
  background-color: rgb(69, 69, 69);
  border-radius: 10px;
  opacity: 0;
  transition: 200ms ease-in-out;
  transform: translateY(-10px) scale(0.95);
}
.popUp.active {
  opacity: 1;
  pointer-events: auto;
  transition: 200ms ease-in-out;
  transform: translateY(0px) scale(1);
}
.popUp p {
  color: #ffffff;
  font-size: 14px;
  line-height: 24px;
}
.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.btn-logout p {
  color: #ffffff;
}

.btn-nav {
  font-weight: 400;
}
@media (min-width: 992px) {
  .label-logout {
    display: block;
  }
}
</style>
