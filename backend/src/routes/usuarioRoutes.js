import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import dotenv from "dotenv";
import { auth } from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// 🔹 Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) return res.status(400).json({ msg: "El usuario ya existe" });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    // 👇 Si el usuario es un negocio, crear su local automáticamente
    if (rol === "business") {
      const { Local } = await import("../models/Local.js");

      await Local.create({
        nombre: `Local de ${nombre}`,
        direccion: "Dirección pendiente",
        capacidad: 100,
        UsuarioId: nuevoUsuario.id, // relación con este usuario
      });
    }

    // Crear token para autologin y devolver usuario sin password
    const token = jwt.sign({ id: nuevoUsuario.id, rol: nuevoUsuario.rol }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const usuario = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      createdAt: nuevoUsuario.createdAt,
    };

    res.status(201).json({ msg: "Usuario registrado con éxito", token, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar usuario" });
  }
});

// 🔹 Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ msg: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al iniciar sesión" });
  }
});

// GET /api/usuarios/me  -> datos del usuario actual
router.get("/me", auth, async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ msg: "No autenticado" });

    const u = await Usuario.findByPk(req.user.id, {
      attributes: ["id", "nombre", "email", "rol", "createdAt"]
    });
    if (!u) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json(u);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Error obteniendo perfil" });
  }
});


export default router;
