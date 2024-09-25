<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
import { deleteTodo, updateTodo } from '@/graphql/mutations';

defineProps({
  todo: {
    type: Object,
    required: true
  }
});

const store = useStore();
const { mutate: deleteTodoMutation, onDone: onDeleteSuccess } = useMutation(gql(deleteTodo));
const { mutate: updateTodoMutation, onDone: onUpdateSuccess } = useMutation(gql(updateTodo));

const updateTodoItem = (todo) => {
  updateTodoMutation({
    id: todo.id,
    completed: !todo.completed
  });
};

const deleteTodoItem = (id: String) => {
  deleteTodoMutation({ id });
};

onDeleteSuccess((result) => {
  if (result?.data?.deleteTodo) {
    store.dispatch('deleteTodoAction', result.data.deleteTodo.id);
  }
});

onUpdateSuccess((result) => {
  if (result?.data?.updateTodo) {
    store.dispatch('updateTodoAction', result.data.updateTodo);
  }
});
</script>

<template>
  <li :class="{ completed: todo.completed }" class="todo-list-item" @click.prevent="() => updateTodoItem(todo)">
    <div class="todo-list-item-description-wrapper">
      <v-checkbox color="green" :model-value="todo.completed" hide-details />
      <span class="todo-list-item-description">{{ todo.description }}</span>
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
  background-color: rgb(76, 175, 80, 10%);
}

.todo-list-item-description-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.completed .todo-list-item-description {
  text-decoration: line-through;
}
</style>
