import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware para verificar token JWT
export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "Acceso denegado. Token no proporcionado." });
    }

    // Formato: "Bearer <token>"
    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user y req.usuario para compatibilidad
    req.user = { id: decoded.id, rol: decoded.rol };
    req.usuario = { id: decoded.id, rol: decoded.rol };
    next();
  } catch (err) {
    console.error("[auth] error:", err.message);
    return res.status(401).json({ msg: "Token inválido o expirado." });
  }
};

export const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    const u = req.usuario ?? req.user;
    if (!u) {
      return res.status(401).json({ msg: "Usuario no autenticado." });
    }

    if (u.rol !== rolRequerido) {
      return res.status(403).json({ msg: "Acceso denegado. Rol insuficiente." });
    }

    next();
  };
};
