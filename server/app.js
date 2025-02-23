import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDb from "./config/db.js";
import authRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));


// User Registration
app.use('/api/v1/user',authRouter);

// CRUD API for To-Do List
app.use('/api/v1/api',todoRouter);

connectDb();
const port=5000 ||process.env.PORT;

app.listen(port, () => console.log('Server running on port 5000'));
