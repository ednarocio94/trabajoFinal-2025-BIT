import express from "express";
import { createUser, showUsers, putUserById, deleteUserById } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const routerUser = express.Router();

routerUser.post("/crear", createUser);
routerUser.get("/obtener", showUsers);
routerUser.put("/actualizar/:id", auth("admin"), putUserById);
routerUser.delete("/eliminar/:id", auth("admin"), deleteUserById);

export default routerUser;