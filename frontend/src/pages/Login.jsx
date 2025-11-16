import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserAfterLogin } = useAuth();
  const navigate = useNavigate();

  // Si ya hay token, intentamos entrar directo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    // Intento rápido de "quién soy"
    api.get("/usuarios/me")
      .then(({ data }) => {
        setUserAfterLogin(data); // data debería ser el usuario
        navigate("/");
      })
      .catch(() => {
        // token inválido → limpiar
        delete api.defaults.headers.common.Authorization;
        localStorage.removeItem("token");
      });
  }, [navigate, setUserAfterLogin]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      // Tu backend debería devolver { token, usuario? }
      const { data } = await api.post("/usuarios/login", { email, password });
      const { token, usuario } = data;

      // 1) Guardar token y ponerlo en Axios
      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // 2) Si el backend ya devuelve usuario, lo usamos.
      //    Si no, lo pedimos a /usuarios/me
      let me = usuario;
      if (!me) {
        const meRes = await api.get("/usuarios/me");
        me = meRes.data; // <- usuario desde el backend
      }

      // 3) Subimos el usuario al contexto
      setUserAfterLogin(me);

      // 4) Redirigimos
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.msg || "Error al iniciar sesión");
      // Limpieza por si falla
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12 }}>
      <h2 style={{ marginBottom: 16 }}>Iniciar sesión</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        <button disabled={loading} className="bg-brand text-white px-3 py-2 rounded">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p style={{ marginTop: 8 }}>
        ¿No tienes cuenta? <Link to="/register" className="underline text-brand">Regístrate</Link>
      </p>
    </div>
  );
}
