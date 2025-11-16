export default function SkeletonCard() {
  return (
    <div className="rounded-xl border p-4 shadow-sm animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-28 bg-gray-200 rounded mb-1.5"></div>
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
      <div className="mt-4 h-9 w-24 bg-gray-200 rounded"></div>
    </div>
  );
}
