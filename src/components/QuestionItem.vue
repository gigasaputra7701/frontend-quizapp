<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

defineProps({
  result: {
    type: Object,
    required: true,
  },
  step: {
    type: Number,
  },
});

const emit = defineEmits(["answer-change", "submit"]);
const selectedOption = ref(null);

const timer = ref("00:00:00");
const totalSeconds = ref(5 * 60);

onMounted(() => {
  const updateTimer = () => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
      const hours = String(Math.floor(totalSeconds.value / 3600)).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((totalSeconds.value % 3600) / 60)
      ).padStart(2, "0");
      const seconds = String(totalSeconds.value % 60).padStart(2, "0");
      timer.value = `${hours}:${minutes}:${seconds}`;
    } else {
      submitAnswers();
    }
  };

  setInterval(updateTimer, 1000);
});

const handleOptionChange = (questionId, option) => {
  selectedOption.value = option;
  emit("answer-change", questionId, option);
};

const submitAnswers = () => {
  emit("submit");
};
</script>

<template>
  <div v-for="res in result.questions" :key="res.question_id">
    <div v-if="step === res.question_id" class="question-container">
      <div class="wrap">
        <h4 class="question-number">Pertanyaan #{{ res.question_id }}</h4>
        <h5 class="question-timer">Sisa Waktu: {{ timer }}</h5>
      </div>
      <h2 class="question-text">{{ res.question_text }}</h2>
      <div class="wrap-options">
        <div
          v-for="(op, index) in res.options"
          :key="index"
          class="input-group"
        >
          <input
            class="radio-input"
            type="radio"
            :name="'question-' + res.question_id"
            :id="'option-' + res.question_id + '-' + index"
            :value="op"
            v-model="selectedOption"
            @change="handleOptionChange(res.question_id, op)"
          />
          <label
            class="radio-label"
            :for="'option-' + res.question_id + '-' + index"
          >
            {{ op }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  margin-top: 2rem;
  padding-top: 2rem;
}
.question-number {
  font-size: 24px;
  color: #222222;
  margin-bottom: 2rem;
}
.question-timer {
  color: #222222;
}
.question-text {
  font-size: 32px;
  margin-bottom: 1.5rem;
}

.wrap {
  display: flex;
  justify-content: space-between;
}
.wrap-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.input-group {
  width: 50%;
}
.radio-input {
  display: none;
}
.radio-label {
  font-weight: 600;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e5e5e5;
  color: #222222;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.radio-input:checked + .radio-label {
  background-color: #222222;
  color: #ffffff;
  border-color: #222222;
}
@media (min-width: 992px) {
  .question-container {
    margin-top: 1rem;
    width: 600px;
  }
}
</style>
