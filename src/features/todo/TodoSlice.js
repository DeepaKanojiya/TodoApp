import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{
    id: nanoid(),
    text: "Sample Todo"
  }],
}
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    DeleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    UpdateTodo(state, action) {
      const { id, newText } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? ({...todo, text : newText}) : todo
      );
      console.log(state.todos)
    },
  },
});

export const { addTodo, DeleteTodo, UpdateTodo } = todoSlice.actions;

export default todoSlice.reducer;
