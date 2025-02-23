import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    completed: {
        type:Boolean
    },
    userId: {type:mongoose.Schema.Types.ObjectId},
  });
  
const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;