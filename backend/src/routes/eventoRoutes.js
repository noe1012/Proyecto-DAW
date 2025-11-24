import express from "express";
import { Evento } from "../models/Evento.js";
import { Local } from "../models/Local.js";
import { auth, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();


// Crear evento automáticamente asociado al local del negocio
router.post("/create", auth, verificarRol("business"), async (req, res) => {
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

// Listar todos los eventos (abierto)
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.findAll({ include: Local });
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener eventos" });
  }
});
// Listar eventos del local del negocio autenticado
router.get("/mios", auth, verificarRol("business"), async (req, res) => {
  try {
    // Buscar el local asociado al usuario
    const local = await Local.findOne({ where: { UsuarioId: req.usuario.id } });

    if (!local) {
      return res
        .status(404)
        .json({ msg: "No se encontró un local asociado a este usuario" });
    }

    // Buscar eventos de ese local
    const eventos = await Evento.findAll({
      where: { LocalId: local.id },
      include: Local,
      order: [["fecha", "ASC"]],
    });

    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener eventos del local" });
  }
});

// GET /api/eventos/:id  -> detalle de un evento
router.get("/:id", async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id, {
      include: Local,   // 👈 igual que en el findAll
    });

    if (!evento) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (err) {
    console.error("Error al obtener evento por id:", err);
    res.status(500).json({ msg: "Error al obtener evento" });
  }
});

//  Actualizar un evento (solo para el negocio propietario)
router.put("/:id", auth, verificarRol("business"), async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha } = req.body;

    // Buscar el local del usuario
    const local = await Local.findOne({ where: { UsuarioId: req.usuario.id } });
    if (!local) return res.status(404).json({ msg: "No se encontró local asociado" });

    // Buscar el evento y verificar que pertenezca al local
    const evento = await Evento.findByPk(id);
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });
    if (evento.LocalId !== local.id) return res.status(403).json({ msg: "No puedes editar este evento" });

    await evento.update({ titulo, descripcion, fecha });

    res.json({ msg: "Evento actualizado", evento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar evento" });
  }
});

// Eliminar un evento (solo para el negocio propietario)
router.delete("/:id", auth, verificarRol("business"), async (req, res) => {
  try {
    const { id } = req.params;

    const local = await Local.findOne({ where: { UsuarioId: req.usuario.id } });
    if (!local) return res.status(404).json({ msg: "No se encontró local asociado" });

    const evento = await Evento.findByPk(id);
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });
    if (evento.LocalId !== local.id) return res.status(403).json({ msg: "No puedes eliminar este evento" });

    await evento.destroy();
    res.json({ msg: "Evento eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar evento" });
  }
});



export default router;
