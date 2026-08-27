import { Eye } from "lucide-react";

export default function BalanceCard() {
  return (
    <section className="mt-4">
      {/* Hero Card Decoration*/}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary  to-primary-dark p-5 shadow-lg shadow-primary/25">
        <div
          aria-hidden
          className="pointer-events-none absolute right-8 -top-6 size-24 rounded-full border-2 border-white/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 bottom-8 size-32 rotate-12 rounded-3xl border border-white/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-4 flex"
        >
          <span className="size-8 rounded-full bg-white/35" />
          <span className="-ml-3 size-8 rounded-full bg-white/20" />
        </div>

        {/* Hero Card Content */}
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 h-7 w-10 rounded-md bg-linear-to-br from-white/55 to-white/20 shadow-inner" />
            <p className="font-medium text-white/75">Total balance</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
              Rp 1,843,560
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
              <span className="rounded-md bg-white/20 px-2 py-1 font-medium backdrop-blur-sm">
                +8.4%
              </span>{" "}
              from last month
            </p>
          </div>
          <button
            className="rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/25"
            aria-label="Toggle balance visibility"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
