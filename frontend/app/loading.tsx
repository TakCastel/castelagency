/** Fallback de chargement global (App Router). */
export default function Loading() {
  return (
    <main data-route-loading className="flex min-h-screen items-center justify-center bg-castel-ink">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-castel-red"
        role="status"
        aria-label="Chargement"
      />
    </main>
  );
}
