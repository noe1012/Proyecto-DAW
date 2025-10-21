export default function PanelNegocio() {
  const local = {
    nombre: "Bar Central",
    direccion: "Calle Principal 123",
    capacidad: 120,
  };

  const eventos = [
    { id: 1, titulo: "Fiesta de Halloween", fecha: "2025-10-31" },
    { id: 2, titulo: "Glow Party", fecha: "2025-11-15" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        Panel del Negocio
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2">Información del local</h2>
        <p><strong>Nombre:</strong> {local.nombre}</p>
        <p><strong>Dirección:</strong> {local.direccion}</p>
        <p><strong>Capacidad:</strong> {local.capacidad} personas</p>
      </div>

      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-3">Tus eventos</h2>
        {eventos.map((e) => (
          <div key={e.id} className="border p-3 rounded mb-3 shadow-sm">
            <p className="font-semibold">{e.titulo}</p>
            <p className="text-gray-600">📅 {e.fecha}</p>
          </div>
        ))}

        <button className="bg-indigo-600 text-white mt-4 px-4 py-2 rounded hover:bg-indigo-700 w-full">
          ➕ Crear nuevo evento
        </button>
      </div>
    </div>
  );
}
