import express from "express";
import { auth, verificarRol } from "../middleware/authMiddleware.js";
import { Asistencia } from "../models/Asistencia.js";
import { Evento } from "../models/Evento.js";
import { Local } from "../models/Local.js";
import { Usuario } from "../models/Usuario.js";

const router = express.Router();

//  Registrar asistencia (solo usuarios normales)
router.post("/registrar", auth, verificarRol("user"), async (req, res) => {
  try {
    const { eventoId } = req.body;
    const usuarioId = req.user?.id ?? req.usuario?.id;
    if (!usuarioId) return res.status(401).json({ msg: "Usuario no autenticado" });

    // Verificar que el evento exista
    const evento = await Evento.findByPk(eventoId);
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });

    // Crear asistencia
    await Asistencia.create({
      UsuarioId: usuarioId,
      EventoId: eventoId,
    });

    res.status(201).json({ msg: "Asistencia registrada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar asistencia" });
  }
});

//  Ver asistentes de un evento (para business o admin)
router.get("/evento/:id", auth, async (req, res) => {
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

//  Ver mis asistencias -> devolver eventos a los que el usuario autenticado se ha apuntado
router.get("/mias", auth, async (req, res) => {
  try {
    const usuarioId = req.user?.id ?? req.usuario?.id;
    if (!usuarioId) return res.status(401).json({ msg: "No autenticado" });

    const asistencias = await Asistencia.findAll({
      where: { UsuarioId: usuarioId },
      include: [{ model: Evento, include: [{ model: Local }] }]
    });
    const eventos = asistencias.map(a => a.Evento).filter(Boolean);
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener tus asistencias" });
  }
});

export default router;
