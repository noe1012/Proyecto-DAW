export default function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white/90 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
