export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white 
                  px-4 py-2 text-sm font-medium shadow-sm hover:bg-indigo-700 active:bg-indigo-800
                  disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
    >
      {children}
    </button>
  );
}
