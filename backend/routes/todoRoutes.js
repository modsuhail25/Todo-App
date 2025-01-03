import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

// routes.post("/", addTodo);
// routes.get("/", getTodos);

routes.route("/").get(protect, getTodos).post(protect, addTodo);
routes
  .route("/:id")
  .delete(protect, deleteTodo)
  .get(protect, getTodo)
  .patch(protect, updateTodo);

export default routes;
