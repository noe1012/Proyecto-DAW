export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const btn = "px-3 py-1 rounded-lg border hover:bg-gray-50";
  const active = "bg-brand text-white border-brand hover:bg-brand-dark";

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <nav className="mt-8 flex items-center gap-2">
      <button
        className={btn}
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        ←
      </button>

      {pages.map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`${btn} ${n === page ? active : ""}`}
        >
          {n}
        </button>
      ))}

      <button
        className={btn}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        →
      </button>
    </nav>
  );
}
