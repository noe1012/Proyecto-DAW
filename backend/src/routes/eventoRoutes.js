import express from "express";
import { Evento } from "../models/Evento.js";
import { Local } from "../models/Local.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Crear evento automáticamente asociado al local del negocio
router.post("/create", verificarToken, verificarRol("business"), async (req, res) => {
  try {
    const { titulo, descripcion, fecha } = req.body;

    // Buscar el local asociado al usuario autenticado
    const local = await Local.findOne({ where: { UsuarioId: req.usuario.id } });

    if (!local) {
      return res.status(404).json({ msg: "No se encontró un local asociado a este usuario" });
    }

    // Crear el evento y vincularlo automáticamente al local
    const evento = await Evento.create({
      titulo,
      descripcion,
      fecha,
      LocalId: local.id,
    });

    res.status(201).json({
      msg: "Evento creado correctamente y asociado a tu local",
      evento,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear evento" });
  }
});

// 🔹 Listar todos los eventos (abierto)
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.findAll({ include: Local });
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener eventos" });
  }
});

export default router;
