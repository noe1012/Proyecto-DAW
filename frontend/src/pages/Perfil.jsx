import { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Perfil() {
  const { user, setUserAfterLogin } = useAuth();
  const [me, setMe] = useState(user);
  const [form, setForm] = useState({ nombre: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Carga/Refresca perfil
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await api.get("/usuarios/me");
        if (!mounted) return;
        setMe(data);
        setForm(f => ({ ...f, nombre: data?.nombre || "" }));
        // sincroniza con el contexto
        setUserAfterLogin(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
    return () => { mounted = false; };
  }, [setUserAfterLogin]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const payload = {};
      if (form.nombre && form.nombre !== me?.nombre) payload.nombre = form.nombre;
      if (form.password) payload.password = form.password;

      if (Object.keys(payload).length === 0) {
        setMsg("No hay cambios.");
      } else {
        const { data } = await api.put("/usuarios/me", payload);
        setMe(data);
        setUserAfterLogin(data);
        setMsg("Perfil actualizado con éxito.");
        setForm({ nombre: data?.nombre || "", password: "" });
      }
    } catch (e) {
      setMsg(e?.response?.data?.msg || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (!me) return null;

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card info */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Información</h2>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-500">Nombre:</span> {me.nombre}</p>
            <p><span className="text-gray-500">Email:</span> {me.email}</p>
            <p><span className="text-gray-500">Rol:</span> 
              <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                {me.rol}
              </span>
            </p>
            {me.createdAt && (
              <p><span className="text-gray-500">Alta:</span> {new Date(me.createdAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Card edición */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Editar</h2>
          <form onSubmit={onSave} className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                className="mt-1 w-full rounded border px-3 py-2"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Nueva contraseña</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                className="mt-1 w-full rounded border px-3 py-2"
                placeholder="(opcional)"
              />
            </div>
            {msg && <p className="text-sm text-gray-600">{msg}</p>}
            <button className="btn-brand" disabled={saving}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        </div>
      </div>

      {/* Extra para propietarios de local */}
      {me.rol === "local" && (
        <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Gestión de local</h2>
          <p className="text-sm text-gray-600 mb-3">
            Como usuario <b>local</b> puedes administrar tu ficha y eventos.
          </p>
          <a href="/panel" className="btn-outline">Ir al Panel</a>
        </div>
      )}
    </div>
  );
}
