import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition ${
        isActive
          ? "text-brand"
          : "text-gray-700 hover:text-brand"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth(); // 👈 acceder al contexto
  const isBusiness = user?.rol === "business";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia token y usuario
    navigate("/"); // redirige al inicio
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-100">
      <nav className="container-app flex h-14 items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold">G</span>
          <span className="text-lg font-semibold tracking-tight">GlowNite</span>
        </Link>

        {/* Desktop */}
      <div className="hidden md:flex items-center gap-1">
        <NavItem to="/">Inicio</NavItem>
        <NavItem to="/eventos">Eventos</NavItem>

          {user ? (
          <>
            {/* Solo para locales/business */}
            {isBusiness && <NavItem to="/mis-eventos">Mis eventos</NavItem>}

            <NavItem to="/perfil">{user.nombre || "Perfil"}</NavItem>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand transition"
            >
              Salir
            </button>
          </>
        ) : (
        <>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/register">Registro</NavItem>
        </>
        )}
      </div>


        {/* CTA (opcional) */}
        <div className="hidden md:block">
          <Link to="/eventos" className="btn-brand">Explorar</Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Abrir menú"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container-app py-2 flex flex-col">
            <NavItem to="/">Inicio</NavItem>
            <NavItem to="/eventos">Eventos</NavItem>

            {user ? (
              <>
              {isBusiness && <NavItem to="/mis-eventos">Mis eventos</NavItem>}
              
                <NavItem to="/perfil">{user.nombre || "Perfil"}</NavItem>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand text-left"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Registro</NavItem>
              </>
            )}

            <Link to="/eventos" className="btn-brand mt-2 w-full text-center">
              Explorar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
