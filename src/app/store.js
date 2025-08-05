import { configureStore } from "@reduxjs/toolkit";
import  todoReducer from "../features/todo/TodoSlice.js"


export const store = configureStore({
  reducer:{
    todos:todoReducer
  }
});