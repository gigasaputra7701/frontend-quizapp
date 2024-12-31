<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const userData = computed(() => userStore.userData);

const id = ref(userData.value._id);
const test_attempt = ref(userData.value.test_attempt);

onMounted(() => {
  userStore.fetchUserData();
});

const handleButtonClick = () => {
  if (test_attempt.value < 1) {
    router.push(`/result/${id.value}`);
  } else {
    router.push(`/test/${id.value}`);
  }
};
</script>
<template>
  <section class="container-home">
    <img
      v-if="test_attempt"
      src="@/assets/img/assets.png"
      class="imgAssets"
      alt="assets-1"
    />
    <img
      v-else
      src="@/assets/img/assets-2.png"
      class="imgAssets"
      alt="assets-2"
    />
    <div class="wrap-content">
      <h1 class="title">
        {{
          test_attempt > 0
            ? "Instruksi Pengerjaan"
            : "Anda Telah Menyelesaikan Tes"
        }}
      </h1>
      <p class="parag">
        {{
          test_attempt > 0
            ? `Tes untuk mengukur pengetahuan umum tentang berbagai topik. Soal
        merupakan pilihan ganda, pilihla jawaban yang menurut anda benar, lalu
        klik selanjutnya. Anda bisa kembali ke Soal sebelumnya atau Lompat ke
        soal berikutnya.`
            : `Selamat! Anda telah menyelesaikan tes ini. Terima kasih telah berpartisipasi. 
  Kami akan memproses hasil tes Anda dan memberikan umpan balik dalam waktu dekat.
  Anda dapat melihat hasilnya di halaman berikutnya.`
        }}
      </p>
      <div class="wrap-icon" v-if="test_attempt">
        <p class="content-icon">
          <svg
            width="31"
            height="32"
            viewBox="0 0 36 37"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 14L4.5 17C11.955 9.54502 24.045 9.54502 31.5 17L34.5 14C25.395 4.89501 10.62 4.89501 1.5 14ZM13.5 26L18 30.5L22.5 26C21.9096 25.4081 21.2082 24.9384 20.4361 24.618C19.6639 24.2975 18.836 24.1325 18 24.1325C17.164 24.1325 16.3361 24.2975 15.5639 24.618C14.7918 24.9384 14.0904 25.4081 13.5 26ZM7.5 20L10.5 23C12.4897 21.012 15.1873 19.8952 18 19.8952C20.8127 19.8952 23.5103 21.012 25.5 23L28.5 20C22.71 14.21 13.305 14.21 7.5 20Z"
              fill="#222222"
            />
          </svg>
          Indikator Sinyal Terhubung
        </p>
        <p class="content-icon">
          <svg
            width="31"
            height="32"
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.3751 16.9583L35.4584 13.875C29.708 8.12457 21.7838 5.9354 14.3376 7.2304L18.3151 11.2079C23.4026 11.1771 28.5055 13.0887 32.3751 16.9583ZM29.2917 20.0417C27.673 18.4302 25.7131 17.2027 23.5567 16.4496L28.2126 21.1054L29.2917 20.0417ZM13.8751 26.2083L18.5001 30.8333L23.1251 26.2083C22.5183 25.5999 21.7974 25.1172 21.0038 24.7879C20.2102 24.4585 19.3593 24.289 18.5001 24.289C17.6408 24.289 16.79 24.4585 15.9964 24.7879C15.2027 25.1172 14.4819 25.5999 13.8751 26.2083ZM5.25716 2.52832L3.08341 4.70207L7.7855 9.40415C5.53467 10.5296 3.42258 12.0096 1.54175 13.875L4.62508 16.9583C6.52133 15.0621 8.7105 13.6283 11.0538 12.6725L14.5072 16.1258C11.9356 16.8096 9.59029 18.1604 7.70842 20.0417L10.7917 23.125C12.7905 21.1181 15.4982 19.9774 18.3305 19.9492L29.2455 30.8642L31.4192 28.6904L5.25716 2.52832Z"
              fill="#222222"
            />
          </svg>
          Indikator Sinyal Terputus
        </p>
      </div>
      <ul v-if="test_attempt">
        <li class="bold">*Persiapakan diri dan Perangkat Anda</li>
        <li class="bold">*Test Hanya dapat dilakukan 1x</li>
      </ul>
      <button class="button" @click="handleButtonClick">
        {{ test_attempt > 0 ? "Mulai Tes" : "Lihat Hasil" }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.container-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0rem 2rem 0rem;
  gap: 1rem;
  max-width: 550px;
}
.imgAssets {
  width: 200px;
  height: 100%;
}
.title {
  font-size: 26px;
  margin-bottom: 1rem;
  text-align: center;
}
.wrap-content {
  display: flex;
  flex-direction: column;
}
.wrap-icon {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}
.content-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 10px;
  padding: 6px;
  border-radius: 5px;
  color: #222222;
  border: 1px solid #646464;
  cursor: pointer;
}
.content-icon:hover {
  background-color: #222222;
  color: white;
}
.content-icon:hover svg path {
  width: 25;
  height: 25;
}
.content-icon:hover svg path {
  fill: white;
}
.parag {
  font-size: 14px;
  margin-bottom: 1rem;
}
.button {
  margin-top: 2rem;
}
li {
  margin-bottom: 0.6rem;
}

@media (min-width: 992px) {
  .imgAssets {
    height: 100%;
    width: 200px;
    background-size: cover;
    object-fit: cover;
  }
  .container-home {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    margin-top: 1.5rem;
    width: 550px;
    gap: 1rem;
  }
  .parag {
    margin-top: 0.6rem;
  }
  li {
    margin-bottom: 0.6rem;
  }
}
</style>
