<script setup lang="ts">
import { ref } from 'vue';

const description = ref('');

const createTodo = () => {
  console.log(description.value);
};
</script>

<template>
  <form @submit.prevent="createTodo">
    <div class="create-todo-wrapper">
      <v-text-field v-model="description" label="Description" variant="outlined" color="primary" />
      <v-btn type="submit" variant="tonal" color="primary">
        <v-icon icon="mdi-plus" size="small" />
        Create
      </v-btn>
    </div>
  </form>
</template>

<style scoped>
.create-todo-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>
