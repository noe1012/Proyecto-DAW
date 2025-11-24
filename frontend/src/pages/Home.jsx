import { useState } from "react";
import useEvents from "../hooks/useEvents";
import EventCard from "../components/EventCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [q, setQ] = useState("");
  const { events, loading, error, filters, setFilters } = useEvents();

  const applySearch = () => setFilters((f) => ({ ...f, q }));
  const setWhen = (when) => setFilters((f) => ({ ...f, when }));
  const toggleFree = () => setFilters((f) => ({ ...f, free: !f.free }));

  return (
    <div className="container-app py-10">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Bienvenido a <span className="text-brand">GlowNite</span>
        </h1>
        <p className="mt-3 text-gray-600">
          Descubre eventos y locales, y apúntate a planes cerca de ti.
        </p>
      </div>

      {/* Buscador + chips */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca por evento o local…"
          className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-800 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <button className="btn-brand h-11" onClick={applySearch}>Buscar</button>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setWhen("today")}
          className={`rounded-full px-3 py-1 text-sm ${filters.when==="today" ? "bg-brand text-white" : "bg-gray-100 text-gray-700"}`}
        >Hoy</button>
        <button
          onClick={() => setWhen("week")}
          className={`rounded-full px-3 py-1 text-sm ${filters.when==="week" ? "bg-brand text-white" : "bg-gray-100 text-gray-700"}`}
        >Esta semana</button>
        <button
          onClick={toggleFree}
          className={`rounded-full px-3 py-1 text-sm ${filters.free ? "bg-brand text-white" : "bg-gray-100 text-gray-700"}`}
        >Gratis</button>
        {/* (Más chips más adelante: Cerca, Música, Tech, etc. Se añadirá en el futuro) */}
      </div>

      {/* Grid de eventos */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        {!loading && error && (
          <div className="col-span-full rounded-xl bg-rose-50 p-4 text-rose-700 ring-1 ring-rose-100">
            {error}
          </div>
        )}
        {!loading && !error && events.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No hay resultados. Prueba con otros filtros.
          </div>
        )}
        {!loading && !error && events.map(ev => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
}
