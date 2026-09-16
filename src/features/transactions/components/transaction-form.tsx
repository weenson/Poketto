"use client";

import { useState } from "react";
import { Pencil, ChevronLeft } from "lucide-react";
import { formatAmount, parseAmount } from "@/utils/format-helper";
import Link from "next/link";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";
import SlideToSave from "./slide-to-save";
import { createTransaction } from "../actions";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import GoalCard from "./goal-card";
import { SavingsGoal } from "@/features/savings/components/goal-list";

type TransactionFormProps = {
  type: "expense" | "income";
  heading: string;
  goals?: SavingsGoal[];
};

export default function TransactionForm({
  type,
  heading,
  goals,
}: TransactionFormProps) {
  const [amount, setAmount] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [goalsVisible, setGoalsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const selectedGoal = goals?.find((g) => g.id === selectedGoals);
  const exceedGoal =
    type === "expense" &&
    goalsVisible &&
    selectedGoal != null &&
    amount != null &&
    amount > selectedGoal.currentAmount;

  const goalDifference = () => {
    if (amount === null || selectedGoal?.currentAmount === undefined) return;
    return amount - selectedGoal.currentAmount;
  };

  const allowSaved =
    amount !== null && amount > 0 && selectedCategory !== "" && !exceedGoal;
  const label = () => {
    if (allowSaved) {
      return "Slide to save";
    } else if (exceedGoal) {
      return "Exceeded goal balance";
    } else if (amount !== null && amount > 0) {
      return "Add category";
    } else if (selectedCategory !== "") {
      return "Add amount";
    } else {
      return "Add amount & category";
    }
  };

  function handleCategoryClick(value: string) {
    if (selectedCategory !== value) {
      setSelectedCategory(value);
    } else {
      setSelectedCategory("");
    }
  }

  async function handleSave() {
    if (amount === null || !selectedCategory || exceedGoal) return;
    setIsPending(true);
    try {
      await createTransaction({
        type: type === "expense" ? "EXPENSE" : "INCOME",
        category: selectedCategory,
        amount,
        notes: notes || undefined,
        savingsId: selectedGoals ?? undefined,
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      setIsPending(false);
    }
  }
  const categories = TRANSACTION_ROUTES[type].transactionCategories;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-3xl flex-col">
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
                className={`w-full rounded-2xl bg-muted py-5 pr-5 pl-14 text-xl font-bold tabular-nums outline-none border-2 border-muted md:py-6 md:text-3xl ${exceedGoal ? "border border-red-500" : ""}`}
                placeholder="0"
              />
            </div>
            {exceedGoal && (
              <p className="text-sm text-red-500 mt-2">
                {formatAmount(goalDifference() ?? 0)} over goal balance
              </p>
            )}
          </section>

          <section>
            <p className="mb-3 text-sm font-medium text-muted-text">Category</p>
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 py-2 scrollbar-none sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible md:py-0 lg:grid-cols-6">
              {categories.map(
                ({ icon: Icon, label, value, bgColor, hexColor }) => {
                  const selected = selectedCategory === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      className="flex shrink-0 flex-col items-center gap-2 md:shrink"
                      onClick={() => handleCategoryClick(value)}
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
              <GoalCard
                goals={goals ?? []}
                selectedGoals={selectedGoals ?? ""}
                setSelectedGoals={setSelectedGoals}
              />
            )}

            {!goalsVisible && (
              <p className="text-sm text-muted-text">
                Include this transaction in a savings goal.
              </p>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-auto pt-8">
        <SlideToSave
          onSave={handleSave}
          disabled={!allowSaved}
          loading={isPending}
          label={isPending ? "Saving..." : label()}
        />
      </section>
    </div>
  );
}
