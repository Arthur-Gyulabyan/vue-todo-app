<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
import { deleteTodo } from '@/graphql/mutations';

defineProps({
  todo: {
    type: Object,
    required: true
  }
});

const store = useStore();
const { mutate: deleteTodoMutation, onDone: onDeleteDone } = useMutation(gql(deleteTodo));

onDeleteDone((result) => {
  if (result?.data?.deleteTodo) {
    store.dispatch('deleteTodoAction', result.data.deleteTodo.id);
  }
});

const deleteTodoItem = (id) => {
  deleteTodoMutation({ id });
};

const updateTodoItem = () => {};
</script>

<template>
  <li
    :class="{
      completed: todo.completed
    }"
    class="todo-list-item"
    @click.prevent="() => updateTodo(todo)"
  >
    <div>
      <span>{{ todo.description }}</span>
    </div>
    <v-btn @click.stop="deleteTodoItem(todo.id)" variant="tonal" color="error" size="small">Delete</v-btn>
  </li>
</template>

<style scoped>
.todo-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border: 1px solid var(--color-border);
  padding: 8px;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
}

.completed {
  text-decoration: line-through;
}
</style>
