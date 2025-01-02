import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./screens/Homepage";
import { ToastContainer } from "react-toastify";
import UpdateTodo from "./screens/UpdateTodo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
