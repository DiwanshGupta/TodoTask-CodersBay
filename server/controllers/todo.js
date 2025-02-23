import { validationResult } from "express-validator";
import Todo from "../models/todo.js";

const getTodo = async (req, res) => {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  };
  
const createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
  const { name, description } = req.body;
  const todo = await Todo.create({ name, description, completed: false, userId: req.userId });
  res.status(200).json(todo);
};
  
const updateTodo = async (req, res) => {
    try {
      const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found or unauthorized" });
      }
       const { name, description, completed } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { name, description, completed },
        { new: true }
      );
  
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
const deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
  
      if (!todo) {
        return res.status(404).json({ message: "Todo not found or unauthorized" });
      }
  
      await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

export {getTodo,createTodo,updateTodo,deleteTodo}