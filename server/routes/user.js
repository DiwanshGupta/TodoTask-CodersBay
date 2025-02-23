import express from "express"
import { getUser, loginUser, registerUser } from "../controllers/user.js";
import { authMiddleware } from "../middleware/authentication/authMiddleware.js";
const authRouter=express.Router();

authRouter.get('/',authMiddleware,getUser);
authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)

export default authRouter;