import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CalendarDays, MapPin, Users } from "lucide-react";
import useAuth from "../hooks/useAuth"; //

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();        
  const isBusiness = user?.rol === "business"; 


  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  // Cargar datos del evento
  useEffect(() => {
    let cancel = false;

    const load = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/eventos/${id}`);
        if (!cancel) setEvento(data);
      } catch (e) {
        console.error(e);
        if (!cancel) setErr("Error al obtener evento");
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    load();
    return () => {
      cancel = true;
    };
  }, [id]);

  const handleApuntarse = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para apuntarte al evento");
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      const { data } = await api.post("/asistencias/registrar", { eventoId: id });

      alert(data?.msg || "Te has apuntado al evento");

      // Actualizar contador localmente (si existe alguno)
      setEvento((prev) => {
        if (!prev) return prev;
        const actual =
          prev.numParticipantes ??
          (prev.asistencias?.length ?? 0);

        return {
          ...prev,
          numParticipantes: actual + 1,
        };
      });
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.msg || "No se pudo registrar la asistencia");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container-app py-10">
        Cargando evento...
      </div>
    );
  }

  if (err || !evento) {
    return (
      <div className="container-app py-10 text-red-600 font-medium">
        {err || "Evento no encontrado"}
      </div>
    );
  }

  // Formatear datos
  const fechaObj = new Date(evento.fecha);
  const fechaFormateada = fechaObj.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const horaFormateada = fechaObj.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nombreLocal =
    evento.local?.nombre || evento.Local?.nombre || "Local pendiente";

  const numParticipantes =
    evento.numParticipantes ??
    (evento.asistencias?.length ?? 0);

  return (
    <div className="bg-slate-50 py-10">
      <div className="container-app max-w-4xl">
        <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-gray-100">
          {/* Cabecera */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-600">
                Evento nocturno
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                {evento.título || evento.titulo}
              </h1>
              <p className="text-slate-600 max-w-xl">
                {evento.descripcion || "Sin descripción disponible."}
              </p>
            </div>
            
            {/* Botón apuntarse / mensaje según tipo de usuario */}
            <div className="mt-2 flex flex-col items-stretch gap-3 md:w-56">
                {!isBusiness ? (
                <>
                <button
                    onClick={handleApuntarse}
                    disabled={saving}
                    className="btn-brand w-full justify-center"
                >
                    {saving ? "Apuntándote..." : "Apuntarme"}
                </button>
                <span className="text-xs text-slate-500 text-center">
                    Se registrará tu asistencia al evento.
                </span>
                </>
                ) : (
                <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                    Eres una cuenta de <strong>local</strong>. Gestiona tus eventos desde{" "}
                    <strong>“Mis eventos”</strong>.
                </div>
                )}
            </div>

          </div>

          {/* Info de detalle */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-1 h-5 w-5 text-rose-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fecha y hora
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {fechaFormateada}
                </p>
                <p className="text-sm text-slate-600">
                  {horaFormateada}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-rose-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Local
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {nombreLocal}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="mt-1 h-5 w-5 text-rose-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Participantes
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {numParticipantes || 0} apuntado(s)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
