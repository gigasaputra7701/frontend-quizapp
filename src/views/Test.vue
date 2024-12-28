<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import isLoading from "@/components/isLoading.vue";
import QuestionItem from "@/components/QuestionItem.vue";

const result = ref({});
const step = ref(1);
const totalStep = ref(0);
const isDisable = ref(false);
const selectedAnswers = ref({});
const router = useRouter();
const toast = useToast();

watch(step, (newStep) => {
  isDisable.value = newStep <= 1;
});

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/test");
    const data = response.data.test[0];
    result.value = { ...data };
    totalStep.value = data.questions.length;
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
  const testResult = {
    user_id: "676ee0d79f54b164801e011d", //manual
    test_id: result.value._id,
    score: calculateScore(),
    answers: selectedAnswers.value,
    completed_at: new Date(),
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/result",
      testResult
    );
    toast.success("Success submitted!");
    router.push("/result");
  } catch (error) {
    console.error("Error submitting test:", error);
  }
};

const handleAnswerChange = (questionId, selectedOption) => {
  selectedAnswers.value[questionId] = selectedOption;
};
</script>

<template>
  <div v-if="result.test_name">
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
        Selanjutnya
      </button>
    </div>
  </div>
  <isLoading v-else />
</template>

<style scoped>
.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.button-prev {
  background-color: rgb(108, 108, 108);
}
.button-prev:hover {
  background-color: rgb(41, 41, 41);
}
.button-submit {
  background-color: rgb(40, 167, 69);
}
.button-submit:hover {
  background-color: rgb(28, 118, 51);
}
</style>
