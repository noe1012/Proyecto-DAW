import express from "express";
import { Local } from "../models/Local.js";
import { Evento } from "../models/Evento.js";

const router = express.Router();

// Listar locales
router.get("/", async (req, res) => {
  try {
    const locales = await Local.findAll();
    res.json(locales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener locales" });
  }
});

// Listar eventos de un local por id
router.get("/:id/eventos", async (req, res) => {
  try {
    const { id } = req.params;
    const eventos = await Evento.findAll({ where: { LocalId: id }, include: Local, order: [["fecha","ASC"]] });
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener eventos del local" });
  }
});

export default router;
