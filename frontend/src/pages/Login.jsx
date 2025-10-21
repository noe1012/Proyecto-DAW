export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form className="flex flex-col gap-3">
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Contraseña" className="border p-2 rounded" />
          <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
