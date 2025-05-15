import express from "express"
import { addTodo, deleteTodo, EditTodo, getAllTodos } from "../controlller/todos.controller.js"

const router = express.Router()
router.post('/todo',addTodo)
router.get('/todos', getAllTodos)
router.put('/todo/:id',EditTodo)
router.delete('/todo/:id',deleteTodo)
export default router