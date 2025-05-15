import { Routes, Route } from 'react-router-dom';
import TodoList from './(screens)/TodoList.jsx';
import Login from './(screens)/Login.jsx';
import Signup from './(screens)/Signup.jsx';

export default function TodoApp() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
