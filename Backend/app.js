import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import routerUser from "./src/routes/user.routes.js";
import routerAdmin from "./src/routes/admin.routes.js";
import petsrouter from "./src/routes/mascotas.routes.js";
import loginAdminRouter from "./src/routes/loginAdmin.routes.js";
import loginUserRouter from "./src/routes/loginUser.routes.js";
import cors from "cors";

const app = express();
dotenv.config();
connectionMongo();

const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use("/usuarios", routerUser);
app.use("/admin", routerAdmin);
app.use("/mascotas", petsrouter);
app.use("/loginAdmin", loginAdminRouter);
app.use("/loginUser", loginUserRouter);

app.listen(port, () => {
  console.log("El servidor está ejecutándose correctamente, en el puerto ", port);
});