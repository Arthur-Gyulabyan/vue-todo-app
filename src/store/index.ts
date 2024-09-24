import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      todos: []
    };
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos = [todo, ...state.todos];
    },
    updateTodo(state, updatedTodo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
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
