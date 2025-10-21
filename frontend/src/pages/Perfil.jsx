export default function Perfil() {
  const usuario = {
    nombre: "Noelia",
    email: "noelia@example.com",
    rol: "user",
    eventos: [
      "Glow Party - 15/11/2025",
      "Rock Fest - 05/12/2025",
    ],
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-4">
        Perfil de Usuario
      </h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        Eventos a los que asistes:
      </h2>
      <ul className="list-disc list-inside text-gray-600">
        {usuario.eventos.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>

      <button className="bg-red-500 text-white mt-6 w-full py-2 rounded hover:bg-red-600">
        Cerrar sesión
      </button>
    </div>
  );
}
