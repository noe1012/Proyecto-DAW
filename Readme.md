# Proyecto GlowNite

Pequeña app para gestionar y explorar eventos: frontend en Vite/React y backend en Express + Sequelize (MySQL).

---

## Tecnologías
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express + Sequelize + MySQL
- Autenticación: JWT

---

## Estructura del repositorio

- `backend/` - servidor Express, modelos Sequelize, rutas API
- `frontend/` - app React (Vite)

---

## Requisitos
- Node.js (>=16)
- MySQL (o MariaDB)

---

## Variables de entorno (backend)
Crear un archivo `.env` en `backend/` con al menos:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_db
DB_PORT=3306
JWT_SECRET=una_clave_secreta
PORT=4000
```

El frontend usa `src/api/axiosConfig.js` con `baseURL` apuntando a `http://localhost:4000/api` por defecto.

---

## Instalación y arranque (local)

1. Backend

```powershell
cd backend
npm install
npm run dev
```

2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

Accede al frontend en `http://localhost:5173` (puerto de Vite por defecto) y al backend en `http://localhost:4000`.

---

## Endpoints principales (resumen)

- `POST /api/usuarios/register` - registrar (devuelve `token` y `usuario` si autologin)
- `POST /api/usuarios/login` - login (devuelve token)
- `GET /api/usuarios/me` - obtener perfil (protegido)

- `GET /api/eventos` - listar todos los eventos
- `GET /api/eventos/:id` - detalle evento
- `POST /api/eventos/create` - crear evento (solo `business`)
- `GET /api/eventos/mios` - listar eventos del local del negocio (solo `business`)
- `PUT /api/eventos/:id` - actualizar (solo owner)
- `DELETE /api/eventos/:id` - eliminar (solo owner)

- `POST /api/asistencias/registrar` - registrar asistencia (solo `user`)
- `GET /api/asistencias/evento/:id` - ver asistentes (business/admin)

---

## Páginas (frontend)

- `/` - Home
- `/eventos` - Explorar eventos públicos
- `/eventos/:id` - Detalle
- `/mis-eventos` - Página para negocios: listar/crear/editar/eliminar eventos (debe autenticarse como `business`)
- `/login`, `/register`, `/perfil`, `/panel-negocio`

---

## Notas importantes
- Si la base de datos ya existía y Sequelize falla con `ALTER TABLE` (p. ej. `Too many keys specified`), el servidor puede no arrancar. Soluciones:
  - Limpiar índices redundantes en la tabla: `SHOW INDEX FROM Usuarios;` y eliminar índices innecesarios con `ALTER TABLE Usuarios DROP INDEX idx_name;`.
  - Si no hay datos importantes, recrear la base de datos limpia y dejar que Sequelize cree las tablas.

- El proyecto usa `sequelize.sync()` para crear tablas; si necesitas migraciones más precisas, considera añadir `sequelize-cli` o `umzug` y scripts de migración.

---

## Contribuir

1. Crear una rama con tu feature: `git checkout -b feat/nueva-funcion`
2. Hacer commits atómicos y descriptivos.
3. Abrir PR y describir el cambio.

---

Si quieres, puedo añadir más secciones al README: diagramas, documentación de la base de datos (ER), ejemplos de uso de la API con `curl` o Postman, o pasos para desplegar en producción.
#  GlowNite

Plataforma web para conectar usuarios y locales de ocio nocturno.

## Estructura del proyecto

## Instalación
1️⃣ Clonar el repositorio:
```bash
git clone https://github.com/TU_USUARIO/glownite.git

2️⃣ Instalar dependencias:

cd backend && npm install
cd ../frontend && npm install


