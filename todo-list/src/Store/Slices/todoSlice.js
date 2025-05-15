import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/api/v1";

// Initial state
const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  
  const response = await fetch(`${API_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todo }),
  });
  return response.json();

});

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, todo) => {
    const response = await fetch(`${API_URL}/todo/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }
);

export const editTodo = createAsyncThunk(
  "todos/deditTodo",
  async (id, todo) => {
    await fetch(`${API_URL}/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title : todo }),
    });
    return id;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: { },
});

// Exporting the action
// export const { addTodos, delTodos, editTodos } = todoSlice.actions;

export default todoSlice.reducer;
