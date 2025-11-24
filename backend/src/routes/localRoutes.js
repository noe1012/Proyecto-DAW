import express from "express";
import { Local } from "../models/Local.js";

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

export default router;
