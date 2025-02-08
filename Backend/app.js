import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import routerUser from "./src/routes/user.routes.js";
import routerAdmin from "./src/routes/admin.routes.js";
import petsrouter from "./src/routes/mascotas.routes.js";
import loginAdminRouter from "./src/routes/loginAdmin.routes.js";
import loginUserRouter from "./src/routes/loginUser.routes.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
connectionMongo();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/usuarios", routerUser);
app.use("/admin", routerAdmin);
app.use("/mascotas", petsrouter);
app.use("/loginAdmin", loginAdminRouter);
app.use("/loginUser", loginUserRouter);

app.use(express.static(path.join(__dirname, "public")));

// Ruta principal para servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


export default app;

