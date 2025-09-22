import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    if (editingIndex !== null) {
      // update existing todo
      const updated = [...todos];
      updated[editingIndex].text = newTodo;
      setTodos(updated);
      setEditingIndex(null);
      setNewTodo("");
    } else {
      // add new todo
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const filtered = todos.filter((_, i) => i !== index);
    setTodos(filtered);
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const editTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditingIndex(index);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        {/* Add Todo */}
        <div className="addtodo my-5">
          <h1 className="text-4xl font-bold my-8">iTask- Manage Your Todos at one place</h1>
          <h2 className="text-lg font-bold mb-3">
            {editingIndex !== null ? "Edit Todo" : "Add a Todo"}
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <input
              type="text"
              placeholder="Write your task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 bg-violet-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              onClick={addTodo}
              className="bg-violet-800 hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-md"
            >
              {editingIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        </div>

        {/* Todos List */}
        <h2 className="text-lg font-bold mb-3">Your Todos</h2>
        <div className="todos space-y-4">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between bg-violet-200 rounded-md p-3"
            >
              <div className="flex items-center gap-2 mb-3 md:mb-0 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5"
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => editTodo(index)}
                  className="bg-violet-800 hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="bg-violet-800 hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-gray-600 italic">No todos yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
