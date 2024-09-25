<script setup lang="ts">
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
const { mutate: deleteTodoMutation, onDone: onDeleteSuccess, loading: loadingDelete } = useMutation(gql(deleteTodo));
const { mutate: updateTodoMutation, onDone: onUpdateSuccess, loading: loadingUpdate } = useMutation(gql(updateTodo));

const updateTodoItem = (todo) => {
  updateTodoMutation({
    id: todo.id,
    completed: !todo.completed
  });
};

const deleteTodoItem = (id: String) => {
  deleteTodoMutation({ id });
};

onDeleteSuccess(() => {
  store.dispatch('openSnackbarAction', 'Successfully deleted!');
});

onUpdateSuccess(() => {
  store.dispatch('openSnackbarAction', 'Successfully updated!');
});
</script>

<template>
  <li :class="{ completed: todo.completed }" class="todo-list-item" @click.prevent="() => updateTodoItem(todo)">
    <div class="d-flex align-center ga-3 w-100">
      <v-checkbox color="green" :model-value="todo.completed" hide-details v-if="!loadingUpdate" />
      <v-progress-circular color="green" size="small" indeterminate v-else />
      <p class="todo-list-item-description w-100">{{ todo.description }}</p>
    </div>
    <v-btn @click.stop="deleteTodoItem(todo.id)" variant="tonal" color="error" size="small" :loading="loadingDelete">
      Delete
    </v-btn>
  </li>
</template>

<style scoped>
.todo-list-item {
  display: flex;
  justify-content: space-between;
  column-gap: 8px;
  align-items: center;
  margin-bottom: 12px;
  border: 1px solid var(--color-border);
  padding: 8px;
  border-radius: 4px;
  box-shadow: rgb(98 98 98 / 20%) 0 4px 8px 0;
  cursor: pointer;
}

.completed {
  background-color: rgb(76, 175, 80, 10%);
}

.completed .todo-list-item-description {
  text-decoration: line-through;
}
</style>
