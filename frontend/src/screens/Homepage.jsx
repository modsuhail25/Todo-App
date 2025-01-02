import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import axios from "axios";
import { useGetTodosQuery } from "../slices/todoApiSlice";

function Homepage() {
  const { data: todos } = useGetTodosQuery();

  // const [todos, setTodos] = useState([]);

  // const getTodos = async () => {
  //   const res = await axios.get("/api/todo");
  //   setTodos(res.data);
  // };

  // useEffect(() => {
  //   getTodos();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center p-6">
          <h1 className="text-3xl font-bold">Todo Manager</h1>
          <p className="text-sm mt-2">Organize your tasks efficiently</p>
        </header>
        <main className="p-6 space-y-6">
          <AddTodo />
          {todos && <TodoList todos={todos} />}
          {/* <AddTodo getTodos={getTodos} />
          {todos && <TodoList todos={todos} getTodos={getTodos} />} */}
        </main>
      </div>
    </div>
  );
}

export default Homepage;
