import { createStore } from 'vuex';
import type { Todo } from '@/API';

interface State {
  todos: Todo[];
}

const store = createStore({
  state(): State {
    return {
      todos: []
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
        state.todos[index] = updatedTodo;
      }
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
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
    }
  },
  getters: {
    allTodos(state) {
      return state.todos;
    }
  }
});

export default store;
