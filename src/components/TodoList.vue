<script setup lang="ts">
import { computed } from 'vue';
import gql from 'graphql-tag';
import { useStore } from 'vuex';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import TodoItem from '@/components/TodoItem.vue';
import Snackbar from '@/components/Snackbar.vue';
import CreateTodo from '@/components/CreateTodo.vue';
import { getTodos } from '@/graphql/queries';
import { onTodoDeleted, onTodoAdded, onTodoUpdated } from '@/graphql/subscriptions';

const store = useStore();
const todos = computed(() => store.getters.allTodos);
const snackbar = computed(() => store.getters.snackbar);

const { onResult: onGetTodoResult, loading } = useQuery(gql(getTodos));

const { onResult: onAddTodoResult } = useSubscription(gql(onTodoAdded));
const { onResult: onUpdateTodoResult } = useSubscription(gql(onTodoUpdated));
const { onResult: onDeleteTodoResult } = useSubscription(gql(onTodoDeleted));

onGetTodoResult((result) => {
  if (result?.data?.getTodos) {
    store.dispatch('saveTodosAction', result.data.getTodos);
  }
});

onAddTodoResult((result) => {
  if (result?.data?.onTodoAdded) {
    store.dispatch('addTodoAction', result.data.onTodoAdded);
  }
});

onUpdateTodoResult((result) => {
  if (result?.data?.onTodoUpdated) {
    store.dispatch('updateTodoAction', result.data.onTodoUpdated);
  }
});

onDeleteTodoResult((result) => {
  if (result?.data?.onTodoDeleted) {
    store.dispatch('deleteTodoAction', result.data.onTodoDeleted.id);
  }
});

const updateSnackbar = () => {
  store.dispatch('resetSnackbarAction');
};
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Todo List</h1>
    </div>

    <div class="content">
      <div class="create-todo-wrapper">
        <CreateTodo />
      </div>
      <div class="todo-list-wrapper">
        <ul v-if="todos && todos.length > 0" class="todo-list">
          <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
        </ul>
        <p class="no-todos" v-else-if="!loading">You're all caught up! No tasks on your list.</p>
        <div class="d-flex justify-center" v-else>
          <v-progress-circular color="green" indeterminate />
        </div>
      </div>
    </div>
  </div>
  <Snackbar :snackbar="snackbar.open" :text="snackbar.text" @update:snackbar="updateSnackbar" />
</template>

<style scoped>
.container {
  width: 800px;
  height: 800px;
  max-width: 100%;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0 14px 28px,
    rgba(0, 0, 0, 0.22) 0 10px 10px;
}

.header {
  padding: 8px 24px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
}

.content {
  height: calc(100% - 148px);
  padding: 24px;
}

.title {
  font-size: 32px;
  font-weight: 600;
}

.todo-list-wrapper {
  height: 100%;
  overflow-y: auto;
}

.todo-list {
  list-style-type: none;
}
</style>
