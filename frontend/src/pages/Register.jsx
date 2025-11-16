import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("user");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserAfterLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const { data } = await api.post("/usuarios/register", {
        nombre, email, password, rol
      });
      // si tu backend devuelve {token, usuario}, úsalo tal cual.
      // si solo confirma el registro, puedes redirigir a /login:
      if (data?.token && data?.usuario) {
        localStorage.setItem("token", data.token);
        setUserAfterLogin(data.usuario);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (e) {
      setErr(e?.response?.data?.msg || "Error al registrarte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Crear cuenta</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input className="border px-3 py-2 rounded" placeholder="Nombre"
                 value={nombre} onChange={(e)=>setNombre(e.target.value)} />
          <input className="border px-3 py-2 rounded" placeholder="Email" type="email"
                 value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="border px-3 py-2 rounded" placeholder="Contraseña" type="password"
                 value={password} onChange={(e)=>setPassword(e.target.value)} />
          <select className="border px-3 py-2 rounded"
                  value={rol} onChange={(e)=>setRol(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="business">Organizador</option>
          </select>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button disabled={loading} className="bg-indigo-600 text-white px-3 py-2 rounded">
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>
        <p className="text-sm mt-3">
          ¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
