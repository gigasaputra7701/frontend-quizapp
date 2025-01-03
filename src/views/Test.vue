<script setup>
import axios from "axios";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/userStore";
import isLoading from "@/components/isLoading.vue";
import QuestionItem from "@/components/QuestionItem.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const userStore = useUserStore();

const step = ref(1);
const totalStep = ref(0);

const isDisable = ref(false);
const selectedAnswers = ref({});

const result = ref({});
const id = ref(route.params.id);

const userData = computed(() => userStore.userData);
const test_attempt = ref(userData.value.test_attempt);

watch(step, (newStep) => {
  isDisable.value = newStep <= 1;
});

onMounted(async () => {
  await userStore.fetchUserData();

  if (test_attempt.value < 1) {
    router.push(`/result/${id.value}`);
  }
  try {
    const res = await axios.get("http://localhost:8000/users");
    const dataUsers = res.data.users;

    const filterId = dataUsers.map((user) => ({
      _id: user._id,
    }));

    const matchedUser = filterId.find((user) => user._id === id.value);
    if (matchedUser) {
      const response = await axios.get("http://localhost:8000/api/test");
      const data = response.data.test[0];
      result.value = { ...data };
      totalStep.value = data.questions.length;
    } else {
      return router.push("/notFound");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const handleNextClick = () => {
  if (step.value < totalStep.value) {
    step.value++;
  } else {
    submitTest();
  }
};

const calculateScore = () => {
  const totalQuestions = result.value.questions.length;
  const correctAnswersCount = result.value.questions.reduce(
    (count, question) => {
      const selectedAnswer = selectedAnswers.value[question.question_id];
      if (selectedAnswer === question.correct_answer) {
        count++;
      }
      return count;
    },
    0
  );

  return Math.round((correctAnswersCount / totalQuestions) * 100);
};

const submitTest = async () => {
  try {
    const testResult = {
      user_id: userData.value._id,
      test_id: result.value._id,
      score: calculateScore(),
      answers: selectedAnswers.value,
      completed_at: new Date(),
    };

    const response = await axios.post(
      "http://localhost:8000/api/result",
      testResult
    );

    if (response.status === 200) {
      localStorage.removeItem("totalSeconds");
      localStorage.removeItem("timer");
      toast.success("Success submitted!");
      await router.push(`/result/${id.value}`);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error Submit!", error);
  }
};

const handleAnswerChange = (questionId, selectedOption) => {
  selectedAnswers.value[questionId] = selectedOption;
};
</script>

<template>
  <div v-if="result.test_name" class="container-quiz">
    <QuestionItem
      :result="result"
      :step="step"
      @answer-change="handleAnswerChange"
      @submit="submitTest"
    />
    <div class="btn-group">
      <button class="button button-prev" @click="step > 1 && step--">
        Kembali
      </button>
      <button class="button" @click="handleNextClick">
        {{ step < totalStep ? "Selanjutnya" : "Submit" }}
      </button>
    </div>
  </div>
  <isLoading v-else />
</template>

<style scoped>
.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.button-prev {
  background-color: rgb(108, 108, 108);
}
.button-prev:hover {
  background-color: rgb(41, 41, 41);
}
</style>
