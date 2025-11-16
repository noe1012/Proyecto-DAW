import { useMemo, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const key = "fav_events";

function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  });

  const isFav = (id) => favs.includes(id);
  const toggle = (id) => {
    const next = isFav(id) ? favs.filter((x) => x !== id) : [...favs, id];
    setFavs(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  return { favs, isFav, toggle };
}

export default function EventCard({ event, evento }) {
  // Aceptamos ambas formas de prop: `event` o `evento` (compatibilidad)
  const e = event ?? evento ?? {};
  const { isFav, toggle } = useFavorites();
  const navigate = useNavigate();

  const formattedDate = useMemo(() => {
    try {
      return new Date(e.fecha).toISOString().slice(0, 10);
    } catch {
      return e.fecha;
    }
  }, [e.fecha]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-gray-100 transition hover:shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {e.título || e.titulo}
        </h3>
        <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-600">
          Nuevo
        </span>
      </div>

      <div className="mb-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{e.local?.nombre || e.localNombre || "—"}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="btn-brand"
          onClick={() => {
            if (!e.id) {
              alert("Este evento no tiene id, no puedo abrir el detalle");
              return;
            }
            navigate(`/eventos/${e.id}`);
          }}
        >
          Ver más
        </button>
        <button
          className="btn-ghost"
          onClick={() => toggle(e.id)}
          aria-pressed={isFav(e.id)}
        >
          {isFav(e.id) ? "Guardado ✓" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
