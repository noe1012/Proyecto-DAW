import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">GlowNite</h1>
      <div className="space-x-4">
        <Link to="/">Inicio</Link>
        <Link to="/eventos">Eventos</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
      </div>
    </nav>
  );
}
