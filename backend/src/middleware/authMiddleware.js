import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware para verificar token JWT
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // El token viene en formato "Bearer token123"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // lo guardamos en la request para usarlo luego
    next();
  } catch (error) {
    res.status(403).json({ msg: "Token inválido o expirado." });
  }
};

export const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ msg: "Usuario no autenticado." });
    }

    if (req.usuario.rol !== rolRequerido) {
      return res.status(403).json({ msg: "Acceso denegado. Rol insuficiente." });
    }

    next();
  };
};
