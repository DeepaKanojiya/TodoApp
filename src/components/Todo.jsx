import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteTodo, UpdateTodo } from "../features/todo/TodoSlice";
import { useDebounce } from "use-debounce";

function Todo() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");
  const [debouncedText] = useDebounce(newText, 500);
  const [search , setSearch] = useState("")

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setNewText(currentText); // Pre-fill with existing text
  };

  const handleUpdate = (id) => {
    if (debouncedText.trim() !== "") {
      dispatch(UpdateTodo({ id, newText: debouncedText }));
    }
    setEditingId(null);
    setNewText("");
  };

  const handleDelete = (id) => {
    dispatch(DeleteTodo(id));
  };

  useEffect(() => {
    console.log(todos);
  }, []);

  return (
    <div className="w-full flex justify-center m-3 p-12 flex-wrap gap-4">
      <div className="w-1/2 bg-[#eee] rounded-md ">
        <input
          placeholder="Search your todo"
          type="text"
          value={search}
          className="w-full h-10 border-2 border-blacks p-6 rounded-md outline-none hover:border-red-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      { search ? todos.filter(todo=> todo.text.toLowerCase().startsWith(search.toLowerCase())).map((todo) => (
        <div
          key={todo.id}
          className="w-full flex justify-between items-center gap-4 bg-amber-100 py-2 px-4 rounded-lg"
        >
          <input
            value={editingId == todo.id ? newText : todo.text}
            onChange={(e) => setNewText(e.target.value)}
            className={`w-full px-2 py-1 text-xl font-semibold mr-4 outline-none ${
              editingId === todo.id
                ? "border-2 rounded-md border-amber-400"
                : "border-transparent"
            }`}
            readOnly={editingId !== todo.id}
          />

          {editingId === todo.id ? (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => handleUpdate(todo.id)}
            >
              Save
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-orange-400 rounded-md"
              onClick={() => startEditing(todo.id, todo.text)}
            >
              Edit
            </button>
          )}

          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      )) : todos.map((todo) => (
        <div
          key={todo.id}
          className="w-full flex justify-between items-center gap-4 bg-amber-100 py-2 px-4 rounded-lg"
        >
          <input
            value={editingId == todo.id ? newText : todo.text}
            onChange={(e) => setNewText(e.target.value)}
            className={`w-full px-2 py-1 text-xl font-semibold mr-4 outline-none ${
              editingId === todo.id
                ? "border-2 rounded-md border-amber-400"
                : "border-transparent"
            }`}
            readOnly={editingId !== todo.id}
          />

          {editingId === todo.id ? (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => handleUpdate(todo.id)}
            >
              Save
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-orange-400 rounded-md"
              onClick={() => startEditing(todo.id, todo.text)}
            >
              Edit
            </button>
          )}

          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
