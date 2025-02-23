import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.js";
import { authMiddleware } from "../middleware/authentication/authMiddleware.js";
import { body } from "express-validator";

const todoRouter=express.Router();

todoRouter.get('/todo',authMiddleware,getTodo);
todoRouter.post('/todo', authMiddleware, [body('name').notEmpty()] ,createTodo);
todoRouter.put('/todo/:id', authMiddleware, updateTodo);
todoRouter.delete('/todo/:id', authMiddleware, deleteTodo);

export default todoRouter;