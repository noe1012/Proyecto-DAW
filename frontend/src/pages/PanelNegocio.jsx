import { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import EventCard from "../components/EventCard";

export default function PanelNegocio() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
  });
  const [saving, setSaving] = useState(false);

  const isBusiness = user?.rol === "business";

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/eventos/mios");
        setEventos(data);
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.msg || "Error al cargar tus eventos");
      } finally {
        setLoading(false);
      }
    };

    if (isBusiness) {
      load();
    }
  }, [isBusiness]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");

    try {
      const { data } = await api.post("/eventos/create", {
        titulo: form.titulo,
        descripcion: form.descripcion,
        fecha: form.fecha,
      });

      // Añadir el nuevo evento a la lista
      setEventos((prev) => [...prev, data.evento]);
      setForm({ titulo: "", descripcion: "", fecha: "" });
      alert("Evento creado correctamente");
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.msg || "Error al crear evento");
    } finally {
      setSaving(false);
    }
  };

  if (!isBusiness) {
    return (
      <div className="container-app py-10 text-red-600">
        Esta sección es solo para cuentas de local.
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-10">
      <div className="container-app max-w-5xl space-y-10">
        {/* Cabecera */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Mis eventos
          </h1>
          <p className="mt-1 text-slate-600">
            Crea y gestiona los eventos de tu local.
          </p>
        </div>

        {/* Formulario crear evento */}
        <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Crear nuevo evento
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Título
              </label>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand focus:ring-brand"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand focus:ring-brand"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fecha y hora
              </label>
              <input
                type="datetime-local"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand focus:ring-brand"
              />
            </div>

            <div className="flex items-end md:justify-end md:col-span-1">
              <button
                type="submit"
                disabled={saving}
                className="btn-brand"
              >
                {saving ? "Guardando..." : "Crear evento"}
              </button>
            </div>
          </form>

          {err && (
            <p className="mt-3 text-sm text-rose-600">
              {err}
            </p>
          )}
        </section>

        {/* Lista de eventos del local */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Eventos de tu local
          </h2>

          {loading ? (
            <p>Cargando...</p>
          ) : eventos.length === 0 ? (
            <p className="text-slate-600 text-sm">
              Todavía no tienes eventos creados.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {eventos.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
