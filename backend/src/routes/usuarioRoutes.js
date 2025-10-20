import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import dotenv from "dotenv";

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

    res.status(201).json({ msg: "Usuario registrado con éxito", usuario: nuevoUsuario });
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

export default router;
