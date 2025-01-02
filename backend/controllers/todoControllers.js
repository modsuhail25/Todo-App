import Todo from "../models/todoModel.js";

const addTodo = async (req, res) => {
  const { title, desc } = req.body;

  const todo = await Todo.create({
    title,
    desc,
    status: true,
  });

  res.json(todo);
};

const getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
};

const getTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);

  res.send("deleted successfully");
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  const { title, desc } = req.body;

  const todo = await Todo.findById(id);

  todo.title = title || todo.title;
  todo.desc = desc || todo.desc;

  const updatedTodo = await todo.save();

  res.json(updatedTodo);
};

export { addTodo, getTodos, deleteTodo, getTodo, updateTodo };
