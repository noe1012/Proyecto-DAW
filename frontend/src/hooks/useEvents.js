import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function useEvents(initialFilters = {}) {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    // Puedes construir querystring desde filters
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.when) params.set("when", filters.when); // "today" | "week"
    if (filters.free) params.set("free", filters.free);

    api.get(`/eventos?${params.toString()}`)
      .then(res => { if (!ignore) setEvents(res.data || []); })
      .catch(err => { if (!ignore) setError(err.message || "Error al cargar eventos"); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; }
  }, [filters]);

  return { events, loading, error, filters, setFilters };
}
