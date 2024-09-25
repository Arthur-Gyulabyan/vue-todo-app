<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { createTodo } from '@/graphql/mutations';
import { useMutation } from '@vue/apollo-composable';

const store = useStore();
const description = ref('');
const errorMessage = ref('');
const { mutate: createTodoMutation, onDone: onCreateTodoSuccess, loading } = useMutation(gql(createTodo));

const onCreateTodo = () => {
  errorMessage.value = '';

  if (!description.value) {
    errorMessage.value = 'Please enter a description.';
    return;
  }

  createTodoMutation({ description: description.value });
};

onCreateTodoSuccess(() => {
  description.value = '';
  store.dispatch('openSnackbarAction', 'Successfully created!');
});
</script>

<template>
  <form @submit.prevent="onCreateTodo">
    <div class="d-flex align-start ga-3 mb-3">
      <v-text-field
        v-model="description"
        label="Description"
        variant="outlined"
        color="default"
        :error-messages="description ? '' : errorMessage"
      />
      <v-btn type="submit" variant="tonal" color="green" :loading="loading">
        <v-icon icon="mdi-plus" size="small" />
        Create
      </v-btn>
    </div>
  </form>
</template>

<style scoped></style>
