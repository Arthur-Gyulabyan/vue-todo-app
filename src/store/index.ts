import { createStore } from 'vuex';
import type { Todo } from '@/API';

interface State {
  todos: Todo[];
}

const store = createStore({
  state(): State {
    return {
      todos: [],
      snackbar: { open: false, text: '' }
    };
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo: Todo) {
      state.todos = [todo, ...state.todos];
    },
    updateTodo(state, updatedTodo: Todo) {
      const index = state.todos.findIndex((todo: Todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos = state.todos.map((item, i) => (i === index ? updatedTodo : item));
      }
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    openSnackbar(state, text) {
      state.snackbar = { open: true, text };
    },
    resetSnackbar(state) {
      state.snackbar = { open: false, text: '' };
    }
  },
  actions: {
    saveTodosAction({ commit }, todos) {
      commit('setTodos', todos);
    },
    addTodoAction({ commit }, todo) {
      commit('addTodo', todo);
    },
    updateTodoAction({ commit }, updatedTodo) {
      commit('updateTodo', updatedTodo);
    },
    deleteTodoAction({ commit }, todoId) {
      commit('deleteTodo', todoId);
    },
    openSnackbarAction({ commit }, text) {
      commit('openSnackbar', text);
    },
    resetSnackbarAction({ commit }) {
      commit('resetSnackbar');
    }
  },
  getters: {
    allTodos(state) {
      return state.todos;
    },
    snackbar(state) {
      return state.snackbar;
    }
  }
});

export default store;
