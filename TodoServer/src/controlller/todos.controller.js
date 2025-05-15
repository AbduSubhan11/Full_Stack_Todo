import mongoose from "mongoose";
import todos from "../models/todos.models.js";

export const getAllTodos = async (_req, res) => {
  const allTodos = await todos.find({});
  if (!allTodos) return res.status(404).json({ message: "No todos found" });
  res.status(200).json(allTodos);
};

export const addTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Please add a title" });
  const newTodo = await todos.create({ title });
  res.status(201).json({
    message: "Todo created successfully",
    newTodo,
  });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "User not found By This Id" });
  await todos.findByIdAndDelete(id);
  res.status(200).json({ message: "Todo deleted successfully" });
};

export const EditTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "User not found By This Id" });
  await todos.findByIdAndUpdate(id, { title }, { new: true });
  res.status(200).json({ message: "Todo Edited successfully" });
};
