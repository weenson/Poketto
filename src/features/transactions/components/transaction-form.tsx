"use client";

import { useState } from "react";
import { Pencil, PiggyBank, ChevronLeft } from "lucide-react";
import {
  formatAmount,
  formatAmountCompact,
  parseAmount,
} from "@/utils/format-helper";
import Link from "next/link";
import Image from "next/image";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";
import SlideToSave from "./slide-to-save";

type TransactionFormProps = {
  type: "expense" | "income";
  heading: string;
};

function GoalThumbnail({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
        <PiggyBank className="h-5 w-5 text-white" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className="h-11 w-11 shrink-0 rounded-xl object-cover"
      width={44}
      height={44}
      onError={() => setFailed(true)}
    />
  );
}

function handleSave() {
  console.log("saved");
}

export default function TransactionForm({
  type,
  heading,
}: TransactionFormProps) {
  const [amount, setAmount] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [goalsVisible, setGoalsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<number | null>(null);

  const allowSaved = (amount !== null && amount > 0) || selectedCategory != "";

  const tempGoalsItem = [
    {
      id: 1,
      name: "Buy a new laptop",
      goalAmount: 13000000,
      currentAmount: 2500000,
      imageUrl: "",
    },
    {
      id: 2,
      name: "Travel to Japan",
      goalAmount: 40000000,
      currentAmount: 1200000,
      imageUrl: "",
    },
    {
      id: 3,
      name: "Buy Cimol",
      goalAmount: 12000,
      currentAmount: 1000,
      imageUrl: "",
    },
  ];

  const categories = TRANSACTION_ROUTES[type].transactionCategories;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-muted p-2.5 transition hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">{heading}</h1>
      </div>

      <div className="md:grid md:grid-cols-5 md:items-start md:gap-8">
        <div className="flex flex-col gap-6 md:col-span-3">
          <section>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-medium text-muted-text"
            >
              Amount
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-text md:text-xl">
                Rp
              </span>
              <input
                id="amount"
                type="text"
                inputMode="numeric"
                value={formatAmount(amount)}
                onChange={(e) => setAmount(parseAmount(e.target.value))}
                className="w-full rounded-2xl bg-muted py-5 pr-5 pl-14 text-xl font-bold tabular-nums outline-none focus:ring-2 focus:ring-primary/30 md:py-6 md:text-3xl"
                placeholder="0"
              />
            </div>
          </section>

          <section>
            <p className="mb-3 text-sm font-medium text-muted-text">Category</p>
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 py-2 scrollbar-none sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible md:py-0 lg:grid-cols-6">
              {categories.map(
                ({ icon: Icon, label, value, bgColor, hexColor }) => {
                  const selected = selectedCategory === label;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      className="flex shrink-0 flex-col items-center gap-2 md:shrink"
                      onClick={() => setSelectedCategory(label)}
                    >
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bgColor}`}
                        style={
                          selected
                            ? {
                                boxShadow: `0 0 0 2px white, 0 0 0 4px ${hexColor}`,
                              }
                            : undefined
                        }
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="max-w-14 truncate text-center text-xs sm:text-sm">
                        {label}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </section>

          <section className="group relative">
            <label htmlFor="notes" className="sr-only">
              Notes
            </label>
            <Pencil className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes..."
              className="w-full rounded-2xl border-2 border-muted p-4 pl-12 font-medium outline-none focus:border-primary focus:text-black"
            />
          </section>
        </div>

        <aside className="mt-6 md:col-span-2 md:mt-0">
          <div className="rounded-2xl bg-muted p-4 md:sticky md:top-8 md:p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-bold">Include in Goals</h2>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={goalsVisible}
                  onChange={(e) => setGoalsVisible(e.target.checked)}
                />
                <div className="relative h-6 w-11 rounded-full bg-muted-text peer-checked:bg-black peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            {goalsVisible && (
              <div className="flex flex-col gap-3 md:gap-3">
                <div className="-mx-1 flex gap-3 overflow-x-auto px-2 py-2 scrollbar-none md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
                  {tempGoalsItem.map((goal) => {
                    const selected = selectedGoals === goal.id;
                    const progress = Math.min(
                      Math.round((goal.currentAmount / goal.goalAmount) * 100),
                    );
                    const currentLabel =
                      formatAmountCompact(goal.currentAmount) ??
                      goal.currentAmount.toLocaleString("id-ID");
                    const goalLabel =
                      formatAmountCompact(goal.goalAmount) ??
                      goal.goalAmount.toLocaleString("id-ID");

                    return (
                      <button
                        type="button"
                        key={goal.id}
                        onClick={() => setSelectedGoals(goal.id)}
                        className={`w-full shrink-0 rounded-2xl bg-white p-4 text-left transition md:shrink md:w-auto ${
                          selected ? "ring-2 ring-black" : "hover:bg-white/80"
                        } min-w-60 md:min-w-0`}
                      >
                        <div className="flex items-center gap-3">
                          <GoalThumbnail src={goal.imageUrl} alt={goal.name} />
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-medium">
                              {goal.name}
                            </h3>
                            <p className="mt-0.5 text-sm tabular-nums text-muted-text">
                              Rp {currentLabel}{" "}
                              <span className="text-primary">
                                / Rp {goalLabel}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="mt-1 text-right text-xs text-muted-text">
                          {progress}%
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {!goalsVisible && (
              <p className="text-sm text-muted-text">
                Include this transaction in a savings goal.
              </p>
            )}
          </div>
        </aside>
        <section className="mt-6">
          <SlideToSave onSave={handleSave} label="Slide to save" />
        </section>
      </div>
    </div>
  );
}
