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

      <section className="hero-card mt-4">
        <div className="bg-linear-to-b from-primary/80 to-primary-dark p-4 rounded-lg">
          <div className=" flex items-start justify-between gap-4">
            <div>
              <p className="text-primary-dark font-medium">Total balance</p>
              <p className="mt-2 text-4xl font-semibold text-white">
                Rp 1,843,560
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-white">
                <span className="bg-white/20 text-white px-2 py-1 rounded-md">
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
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
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
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
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
    </div>
  );
}
