// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="container-app py-8 grid gap-8 md:grid-cols-3 text-sm text-gray-600">
        {/* Columna 1: brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold">
              G
            </span>
            <span className="text-base font-semibold tracking-tight">GlowNite</span>
          </div>
          <p className="text-gray-500">
            Descubre eventos nocturnos y locales con buen ambiente. 
            Organiza tus planes sin perderte nada.
          </p>
        </div>

        {/* Columna 2: navegación rápida */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Navegación
          </h3>
          <nav className="flex flex-col gap-1">
            <Link to="/" className="hover:text-brand transition-colors">Inicio</Link>
            <Link to="/eventos" className="hover:text-brand transition-colors">Eventos</Link>
            <Link to="/login" className="hover:text-brand transition-colors">Login</Link>
            <Link to="/register" className="hover:text-brand transition-colors">Registro</Link>
          </nav>
        </div>

        {/* Columna 3: info / redes */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Acerca de
          </h3>
          <p className="text-gray-500">
            Proyecto final DAW. Plataforma inspirada en apps como Meetup 
            para gestionar eventos y locales.
          </p>
          <div className="flex gap-3 text-gray-400 text-lg">
            <button aria-label="Instagram" className="hover:text-brand transition-colors">
              ◼
            </button>
            <button aria-label="Twitter" className="hover:text-brand transition-colors">
              ◻
            </button>
            <button aria-label="TikTok" className="hover:text-brand transition-colors">
              ◯
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container-app py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {year} GlowNite. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
