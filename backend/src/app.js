import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
import "./models/relaciones.js";

// Importar rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";
import localRoutes from "./routes/localRoutes.js";
import asistenciaRoutes from "./routes/asistenciaRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

sequelize.sync({ alter: true })
  .then(() => console.log("📦 Tablas sincronizadas correctamente"))
  .catch(err => console.error("❌ Error al sincronizar las tablas:", err));

// 👉 Usar las rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/locales", localRoutes);
app.use("/api/asistencias", asistenciaRoutes);


app.get("/", (req, res) => {
  res.send("🚀 GlowNite API funcionando y conectada");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
