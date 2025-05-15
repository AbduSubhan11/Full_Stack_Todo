import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../Store/Slices/todoSlice";
import React from "react";

export default function TodoApp() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [todosData, setTodosData] = useState([])

  const fetchTodos = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/todos`);
      const data = await res.json();
      setTodosData(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [])

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
    fetchTodos();
  };

  const handleDelTodo = (index) => {
    dispatch(deleteTodo(index))
    fetchTodos();
  }

  const handleEditTodo = (index, currentTodo) => {
    const updatedTodo = prompt("Edit your todo:", currentTodo);
    if (updatedTodo !== null && updatedTodo.trim() !== "") {
      dispatch(editTodo({ index, todo: updatedTodo }));
    }
    fetchTodos();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Todo List</h1>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a todo..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        {todosData.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No todos yet. Add one!</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {todosData.map((todo, index) => (
              <li
                key={index}
                className="bg-gray-200 p-2 rounded-lg flex justify-between items-center"
              >
                {todo.title}
                <div className="flex gap-4">


                  <button
                    onClick={() => handleDelTodo(todo._id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                  <button onClick={() => handleEditTodo(todo._id, todo.title)}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}
