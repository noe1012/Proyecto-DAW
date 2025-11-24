import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function MisEventos() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titulo: "", descripcion: "", fecha: "" });

  const [attendees, setAttendees] = useState([]);
  const [showAttModal, setShowAttModal] = useState(false);

  const fetchMy = async () => {
    setLoading(true); setError("");
    try {
      const { data } = await api.get("/eventos/mios");
      setEvents(data || []);
    } catch (e) {
      setError(e?.response?.data?.msg || "Error cargando tus eventos");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchMy(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ titulo: "", descripcion: "", fecha: "" });
    setShowForm(true);
  };

  const openEdit = (ev) => {
    setEditing(ev);
    setForm({ titulo: ev.titulo || "", descripcion: ev.descripcion || "", fecha: ev.fecha ? ev.fecha.slice(0,10) : "" });
    setShowForm(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/eventos/${editing.id}`, form);
      } else {
        await api.post(`/eventos/create`, form);
      }
      setShowForm(false);
      fetchMy();
    } catch (err) {
      alert(err?.response?.data?.msg || "Error guardando");
    }
  };

  const removeEvent = async (id) => {
    if (!confirm("Eliminar evento?")) return;
    try {
      await api.delete(`/eventos/${id}`);
      fetchMy();
    } catch (e) { alert(e?.response?.data?.msg || "Error eliminando"); }
  };

  const viewAttendees = async (id) => {
    try {
      const { data } = await api.get(`/asistencias/evento/${id}`);
      setAttendees(data || []);
      setShowAttModal(true);
    } catch (e) { alert(e?.response?.data?.msg || "Error cargando asistentes"); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Mis eventos</h1>
        <div>
          <button className="btn-brand" onClick={openNew}>Crear evento</button>
        </div>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="divide-y rounded-xl border bg-white">
          {events.length === 0 && <li className="p-6 text-gray-500">No tienes eventos.</li>}
          {events.map(ev => (
            <li key={ev.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-semibold">{ev.titulo}</p>
                <p className="text-sm text-gray-600">{new Date(ev.fecha).toLocaleDateString()} • {ev.Local?.nombre ?? "—"}</p>
                <p className="text-sm text-gray-500 mt-1">{ev.descripcion}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand" onClick={() => openEdit(ev)}>Editar</button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand" onClick={() => viewAttendees(ev.id)}>Participantes</button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800" onClick={() => removeEvent(ev.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="font-semibold mb-3">{editing ? "Editar evento" : "Crear evento"}</h3>
            <form onSubmit={submitForm} className="flex flex-col gap-3">
              <input className="border px-3 py-2 rounded" placeholder="Título" value={form.titulo} onChange={(e)=>setForm({...form, titulo: e.target.value})} required />
              <textarea className="border px-3 py-2 rounded" placeholder="Descripción" value={form.descripcion} onChange={(e)=>setForm({...form, descripcion: e.target.value})} />
              <input className="border px-3 py-2 rounded" type="date" value={form.fecha} onChange={(e)=>setForm({...form, fecha: e.target.value})} required />
              <div className="flex justify-end gap-2">
                <button type="button" className="px-3 py-2 rounded-md" onClick={()=>setShowForm(false)}>Cancelar</button>
                <button className="btn-brand" type="submit">{editing ? "Guardar" : "Crear"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showAttModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="font-semibold mb-3">Participantes</h3>
            <ul className="divide-y">
              {attendees.length === 0 && <li className="p-3 text-gray-500">No hay asistentes.</li>}
              {attendees.map(a => (
                <li key={a.id} className="p-2">
                  <div className="text-sm font-medium">{a.nombre}</div>
                  <div className="text-xs text-gray-500">{a.email}</div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <button className="px-3 py-2 rounded-md" onClick={()=>setShowAttModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
