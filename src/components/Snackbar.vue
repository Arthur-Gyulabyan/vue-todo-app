<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

const props = defineProps({
  snackbar: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const emit = defineEmits<{
  (event: 'update:snackbar', value: boolean): void;
}>();

const timeout = 2000;
const localSnackbar = ref(props.snackbar);

watch(
  () => props.snackbar,
  (newVal) => {
    localSnackbar.value = newVal;

    if (newVal) {
      setTimeout(() => {
        emit('update:snackbar', false);
      }, timeout);
    }
  }
);
</script>

<template>
  <v-snackbar v-model="localSnackbar" :timeout="timeout" color="success">
    {{ text }}
  </v-snackbar>
</template>
