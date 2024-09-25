<script setup lang="ts">
import { ref } from 'vue';
import gql from 'graphql-tag';
import { createTodo } from '@/graphql/mutations';
import { useMutation } from '@vue/apollo-composable';
import { useStore } from 'vuex';

const store = useStore();

const description = ref('');
const { mutate: createTodoMutation, onDone: onCreateTodoSuccess, loading } = useMutation(gql(createTodo));

const onCreateTodo = () => {
  if (!description.value.length) {
    return;
  }

  createTodoMutation({ description: description.value });
};

onCreateTodoSuccess((response) => {
  description.value = '';
  if (response?.data?.createTodo) {
    store.dispatch('addTodoAction', response.data.createTodo);
  }
});
</script>

<template>
  <form @submit.prevent="onCreateTodo">
    <div class="create-todo-wrapper">
      <v-text-field v-model="description" label="Description" variant="outlined" color="default" />
      <v-btn type="submit" variant="tonal" color="green" :loading="loading">
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
