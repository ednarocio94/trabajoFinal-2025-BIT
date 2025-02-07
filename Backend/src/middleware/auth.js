import { verifyToken } from "../lib/jwt.js";

function auth(requiredRol) {
  return async (req, res, next) => {
    let token = req.headers["authorization"];
    console.log("Token obtenido de la cabecera: " + token);

    if (!token) {
      return res.status(401).json({
        mensaje: "No se encontró token, por favor proporcione uno.",
      });
    }

    token = token.split(" ")[1];
    console.log("Token después de separarlo del Bearer: " + token);

    try {
      const decoded = await verifyToken(token);
      console.log("Token decodificado: ", decoded);

      if (requiredRol === "admin" && !decoded.isAdmin) {
        return res.status(401).json({
          mensaje: "Acceso no permitido. Se requiere rol de administrador.",
        });
      }

      req.user = decoded;
    } catch (error) {
      return res.status(400).json({
        mensaje: "Falló la autenticación del token",
        problema: error.message || error,
      });
    }

    next();
  };
}

export default auth;