import User from "../models/user.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  

const registerUser= async (req, res) => {
    const { email, password,name } = req.body;
    console.log(email,password,name)
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({name, email, password: hashedPassword });
      const token = jwt.sign({ userId: user._id,userName:user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.status(201).json({user,token});
    } catch (error) {
      res.status(400).json({ error: 'User already exists' });
    }
};
  
const loginUser= async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id,userName:user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ user,token });
};
export {registerUser,loginUser,getUser};