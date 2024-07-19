<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: 'Поиск'
  },
});

const emit = defineEmits(['update:modelValue']);

const updateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <input :value="modelValue" :placeholder="label" @input="updateInput" class="input" type="password" required>
</template>

<style scoped>
.input {
  margin-bottom: 15px;
  padding: 8px 10px;
  border: 1px solid #828282;
  border-radius: 7px;
  font-size: 14px;
}

.input:focus {
  box-shadow: 0 0 0 1px #226F54;
  outline: none;
}
</style>