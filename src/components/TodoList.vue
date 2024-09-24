<script setup>
import CreateTodo from '@/components/CreateTodo.vue';
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Todo List</h1>
    </div>

    <div class="create-todo-wrapper">
      <CreateTodo />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 800px;
  height: 800px;
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

.title {
  font-size: 32px;
  font-weight: 600;
}

.create-todo-wrapper {
  padding: 24px;
}
</style>
