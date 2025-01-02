import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
