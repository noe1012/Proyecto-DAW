export default function Eventos() {
  const eventos = [
    { id: 1, titulo: "Noche Latina", fecha: "2025-11-01", local: "Bar Central" },
    { id: 2, titulo: "Glow Party", fecha: "2025-11-15", local: "Club Nocturno 21" },
    { id: 3, titulo: "Rock Fest", fecha: "2025-12-05", local: "Sala Indie" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        🎉 Próximos eventos
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{evento.titulo}</h2>
            <p className="text-gray-600">📅 {evento.fecha}</p>
            <p className="text-gray-600">📍 {evento.local}</p>
            <button className="bg-indigo-600 text-white mt-3 px-4 py-2 rounded hover:bg-indigo-700">
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
