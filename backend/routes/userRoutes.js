import express from "express";
import { registerUser, authUser } from "../controllers/userControllers.js";

const routes = express.Router();

routes.route("/").post(registerUser);
routes.route("/auth").post(authUser);

export default routes;
