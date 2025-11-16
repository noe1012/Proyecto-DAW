export default function EventCardSkeleton() {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
      <div className="space-y-2 text-sm">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-9 w-20 bg-gray-200 rounded" />
        <div className="h-9 w-24 bg-gray-200 rounded" />
      </div>
    </article>
  );
}
