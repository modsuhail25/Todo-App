import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./screens/Homepage";
import { ToastContainer } from "react-toastify";
import UpdateTodo from "./screens/UpdateTodo";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<SignUpScreen />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/update/:id" element={<UpdateTodo />} />

        <Route path="*" element={<LoginScreen />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
