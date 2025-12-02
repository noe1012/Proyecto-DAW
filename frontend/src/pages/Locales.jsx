import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import EventCard from "../components/EventCard";

export default function Locales() {
  const [locales, setLocales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selected, setSelected] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await api.get("/locales");
        if (!mounted) return;
        setLocales(data || []);
      } catch (e) {
        setError(e?.response?.data?.msg || "Error cargando locales");
      } finally { if (mounted) setLoading(false); }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const openLocal = async (loc) => {
    setSelected(loc);
    setEvents([]);
    setEventsLoading(true);
    try {
      const { data } = await api.get(`/locales/${loc.id}/eventos`);
      setEvents(data || []);
    } catch (e) {
      alert(e?.response?.data?.msg || "Error cargando eventos del local");
    } finally { setEventsLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Locales (Bares)</h1>
      </div>

      {loading ? (
        <div>Cargando locales...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <ul className="rounded-xl border bg-white divide-y">
              {locales.map(loc => (
                <li key={loc.id} className="p-3 hover:bg-gray-50 cursor-pointer" onClick={() => openLocal(loc)}>
                  <div className="font-semibold">{loc.nombre}</div>
                  <div className="text-sm text-gray-500">{loc.direccion}</div>
                  <div className="text-xs text-gray-400">Capacidad: {loc.capacidad}</div>
                </li>
              ))}
              {!locales.length && <li className="p-3 text-gray-500">No hay locales.</li>}
            </ul>
          </div>

          <div className="col-span-2">
            <div className="rounded-xl border bg-white p-4">
              {selected ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-lg font-semibold">{selected.nombre}</h2>
                      <div className="text-sm text-gray-500">{selected.direccion}</div>
                    </div>
                  </div>

                  {eventsLoading ? (
                    <div>Cargando eventos...</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {events.map(ev => <EventCard key={ev.id} evento={ev} />)}
                      {!events.length && <div className="col-span-full p-4 text-gray-500">No hay eventos para este local.</div>}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500">Selecciona un local a la izquierda para ver sus eventos.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
