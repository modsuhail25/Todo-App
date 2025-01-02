import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetTodoQuery,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../slices/todoApiSlice";

function UpdateTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("pending");
  // const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { data: todo } = useGetTodoQuery(id);
  const { refetch } = useGetTodosQuery();
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const navigate = useNavigate();

  // const getTodo = async () => {
  //   const res = await axios.get(`/api/todo/${id}`);

  //   setDesc(res.data.desc);
  //   setTitle(res.data.title);
  //   setStatus(res.data.status);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTodo({ title, desc, status, id });
    // setIsLoading(true);
    // await axios.patch(`/api/todo/${id}`, { title, desc, status });
    // setIsLoading(false);
    refetch();
    navigate("/");
    toast.success("Updated Succesfully");
  };

  useEffect(() => {
    if (todo) {
      setDesc(todo.desc);
      setTitle(todo.title);
      setStatus(todo.status);
    }
    // getTodo();
  }, [todo]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Todo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter todo description"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              {isLoading ? <Loader /> : "Update Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodo;
