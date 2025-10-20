import express from "express";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";
import { Asistencia } from "../models/Asistencia.js";
import { Evento } from "../models/Evento.js";

const router = express.Router();

// 🔹 Registrar asistencia (solo usuarios normales)
router.post("/registrar", verificarToken, verificarRol("user"), async (req, res) => {
  try {
    const { eventoId } = req.body;

    // Verificar que el evento exista
    const evento = await Evento.findByPk(eventoId);
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });

    // Crear asistencia
    await Asistencia.create({
      UsuarioId: req.usuario.id,
      EventoId: eventoId,
    });

    res.status(201).json({ msg: "Asistencia registrada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar asistencia" });
  }
});

// 🔹 Ver asistentes de un evento (para business o admin)
router.get("/evento/:id", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id, { include: ["Usuarios"] });
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });

    res.json(evento.Usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener asistentes" });
  }
});

export default router;
