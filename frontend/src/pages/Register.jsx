export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option value="user">Usuario</option>
            <option value="business">Negocio</option>
          </select>
          <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Registrarse
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-3">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
