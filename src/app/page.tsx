import { formatDateToText } from "@/lib/format-helper";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Eye,
  ChevronRight,
  BanknoteCheck,
  ShoppingBag,
} from "lucide-react";
import Button from "@/components/button";

export default function Home() {
  const date = new Date();
  const formattedDate = formatDateToText(date);
  return (
    <div>
      <section>
        <div>
          <p className="text-muted-text text-xs font-bold">{formattedDate}</p>
          <h1 className="text-2xl font-bold">
            Hello, <span className="text-primary">Winson</span> <span>👋</span>
          </h1>
          <p className="text-muted-text text-sm">Ready to track your money!</p>
        </div>
        <div className="flex gap-2 mt-8 justify-center">
          <Button variant="black" size="md" justify="center">
            <BanknoteArrowDown className="w-5 h-5 mr-2" />
            Spend
          </Button>
          <Button variant="primary" size="md" justify="center">
            <BanknoteArrowUp className="w-5 h-5 mr-2" />
            Income
          </Button>
        </div>
      </section>

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

      <section className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-black font-medium">Recent Transactions</p>
          <p className="flex items-center gap-1">
            View all{" "}
            <span>
              <ChevronRight size={16} />
            </span>
          </p>
        </div>
        <div className="mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-success p-4 rounded-full">
                <BanknoteCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-black font-medium">Salary</p>
                <p className="text-muted-text text-sm">Monthly salary.</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-success font-bold text-lg">+Rp 8,000,000</p>
              <p className="text-muted-text text-sm">3 Days ago</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-danger p-4 rounded-full">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-black font-medium">Groceries</p>
                <p className="text-muted-text text-sm">
                  Shopping for groceries.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-danger font-bold text-lg">-Rp 500,000</p>
              <p className="text-muted-text text-sm">1 Days ago</p>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
}
