import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : { todos: [], filter: "all" };

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.id
          ? { ...todo, title: payload.title, completed: payload.completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state));
    },
    setFilter: (state, { payload }) => {
      state.filter = payload; 
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const { addTodo, removeTodo, editTodo, setFilter, clearCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
