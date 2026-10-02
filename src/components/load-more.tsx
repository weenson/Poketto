"use client";
import { useState } from "react";
export default function LoadMore<T>({
  initialItems,
  loadPage,
  children,
}: {
  initialItems: T[];
  loadPage: (page: number) => Promise<T[]>;
  children: (items: T[]) => React.ReactNode;
}) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialItems.length === 10);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    const nextPage = page + 1;
    const next = await loadPage(nextPage);
    setItems((current) => [...current, ...next]);
    setPage(nextPage);
    setHasMore(next.length === 10);
    setLoading(false);
  }

  return (
    <>
      {children(items)}
      {hasMore && (
        <button
          type="button"
          onClick={loadMore}
          disabled={loading}
          className="mt-4 w-full rounded-2xl bg-muted py-3 text-sm font-medium text-black transition hover:bg-black/5 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}
