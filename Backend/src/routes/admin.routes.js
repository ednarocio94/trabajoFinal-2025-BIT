import express from "express";
import {
  createAdmin,
  showAdmin,
  updateAdminById,
  deleteAdminById,
} from "../controllers/admin.controller.js";
import auth from "../middleware/auth.js";

const routerAdmin = express.Router();

// Rutas para la gestión de administradores
routerAdmin.post("/crear", createAdmin);
routerAdmin.get("/", showAdmin);
routerAdmin.put("/actualizar/:id", auth("admin"), updateAdminById);
routerAdmin.delete("/eliminar/:id", auth("admin"), deleteAdminById);

export default routerAdmin;