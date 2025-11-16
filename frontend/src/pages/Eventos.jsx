import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosConfig";
import FiltersBar from "../components/FiltersBar";
import EventCard from "../components/EventCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Events() {
  const [raw, setRaw] = useState([]);       // eventos del backend
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q: "", gratis: false, when: "all", view: "grid" });
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    api.get("/eventos")
      .then(res => { if (active) setRaw(res.data || []); })
      .catch(() => { if (active) setError("No se pudo cargar eventos"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  // Filtro en cliente (rápido). Más adelante movemos al backend con query params.
  const items = useMemo(() => {
    let list = [...raw];
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter(e =>
        e.titulo?.toLowerCase().includes(q) ||
        e.descripcion?.toLowerCase().includes(q) ||
        e.local?.nombre?.toLowerCase().includes(q)
      );
    }
    if (filters.gratis) list = list.filter(e => e.precio === 0 || e.gratis === true);
    if (filters.when !== "all") {
      const today = new Date(); today.setHours(0,0,0,0);
      const weekEnd = new Date(today); weekEnd.setDate(today.getDate() + 7);
      list = list.filter(e => {
        const d = new Date(e.fecha);
        if (filters.when === "today") return d.toDateString() === today.toDateString();
        if (filters.when === "week")  return d >= today && d <= weekEnd;
        return true;
      });
    }
    // orden fecha asc
    list.sort((a,b) => new Date(a.fecha) - new Date(b.fecha));
    return list;
  }, [raw, filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Eventos</h1>

      <FiltersBar onChange={setFilters} initial={filters} />

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* vistas */}
      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({length:6}).map((_,i)=><SkeletonCard key={i} />)}
          </div>
        ) : filters.view === "map" ? (
          <div className="h-[420px] rounded-xl border flex items-center justify-center text-gray-500 bg-gray-50">
            🗺️ Vista mapa (placeholder). Luego integramos Leaflet/Google Maps con los locales.
          </div>
        ) : filters.view === "list" ? (
          <ul className="divide-y rounded-xl border bg-white">
            {items.map(ev => (
              <li key={ev.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="font-semibold">{ev.titulo}</p>
                  <p className="text-sm text-gray-600">{new Date(ev.fecha).toLocaleDateString()} • {ev.local?.nombre ?? "—"}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`/eventos/${ev.id}`} className="btn-brand rounded-lg px-4 py-2 text-white">Ver más</a>
                </div>
              </li>
            ))}
            {!items.length && <li className="p-6 text-gray-500">No hay resultados.</li>}
          </ul>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(ev => <EventCard key={ev.id} evento={ev} />)}
            {!items.length && (
              <div className="col-span-full rounded-xl border p-6 text-gray-500 bg-white">
                No hay resultados.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
