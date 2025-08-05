import React, { useState } from "react";
import { addTodo } from "../features/todo/TodoSlice";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const [debouncedText] = useDebounce(todo, 500); // 500ms debounce
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (debouncedText.trim() === "") return;

    dispatch(addTodo(debouncedText));
    setTodo("");
  };

  return (
    <div className="h-[20%] w-full bg-red-200 p-12">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex justify-center items-center"
      >
        <div className="w-[80%] h-[50%] flex justify-center items-center p-12">
          <input
            placeholder="Enter your todo"
            type="text"
            className="w-1/2 h-10 border-2 border-blacks p-6 rounded-md outline-none hover:border-red-400"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            disabled={todo !== debouncedText}
            className="bg-blue-500 text-white rounded-lg cursor-pointer px-2 py-4 ml-2 disabled:opacity-50"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
