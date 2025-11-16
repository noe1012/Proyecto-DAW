import { useState } from "react";

export default function FiltersBar({ onChange, initial = {} }) {
  const [q, setQ] = useState(initial.q ?? "");
  const [gratis, setGratis] = useState(initial.gratis ?? false);
  const [when, setWhen] = useState(initial.when ?? "all"); // all|today|week
  const [view, setView] = useState(initial.view ?? "grid"); // grid|list|map

  // notifica al padre cada vez que algo cambia
  const emit = (next = {}) => {
    const payload = {
      q, gratis, when, view, ...next,
    };
    onChange?.(payload);
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-xl bg-white/70 p-3 shadow-sm border">
      {/* búsqueda */}
      <div className="flex-1 flex gap-2">
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Busca por evento o local…"
          value={q}
          onChange={(e) => { setQ(e.target.value); emit({ q: e.target.value }); }}
        />
        <button
          onClick={() => emit()}
          className="btn-brand px-5 py-2 rounded-lg"
        >
          Buscar
        </button>
      </div>

      {/* chips */}
      <div className="flex gap-2 flex-wrap">
        <button
          className={`chip ${when === "today" ? "chip-active" : ""}`}
          onClick={() => { setWhen(when === "today" ? "all" : "today"); emit({ when: when === "today" ? "all" : "today" }); }}
        >
          Hoy
        </button>
        <button
          className={`chip ${when === "week" ? "chip-active" : ""}`}
          onClick={() => { setWhen(when === "week" ? "all" : "week"); emit({ when: when === "week" ? "all" : "week" }); }}
        >
          Esta semana
        </button>
        <button
          className={`chip ${gratis ? "chip-active" : ""}`}
          onClick={() => { setGratis(!gratis); emit({ gratis: !gratis }); }}
        >
          Gratis
        </button>

        {/* Toggle de vista */}
        <div className="ml-2 inline-flex rounded-lg border overflow-hidden">
          {["grid","list","map"].map(v => (
            <button
              key={v}
              className={`px-3 py-2 text-sm ${view===v ? "bg-brand text-white" : "bg-white"}`}
              onClick={() => { setView(v); emit({ view: v }); }}
            >
              {v === "grid" ? "Tarjetas" : v === "list" ? "Lista" : "Mapa"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
