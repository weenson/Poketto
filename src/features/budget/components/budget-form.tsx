"use client";

import Button from "@/components/button";
import { DollarSign } from "lucide-react";
import { formatAmount, parseAmount } from "@/utils/format-helper";
import { useState } from "react";
import { createBudget } from "../action";
export default function BudgetForm() {
  const [monthly, setMonthly] = useState(0);

  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  const daily = daysInMonth > 0 ? Math.floor(monthly / daysInMonth) : 0;

  async function handleCreate() {
    if (monthly <= 0) return;
    await createBudget({ amount: monthly });
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="budget-amount"
          className="mb-2 block text-sm font-medium"
        >
          Total Monthly Budget Limit
        </label>
        <div className="relative">
          <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text" />
          <input
            id="budget-amount"
            type="text"
            inputMode="numeric"
            placeholder="Amount"
            className="w-full rounded-2xl border border-muted-text p-3 pl-12 text-sm font-medium"
            value={formatAmount(monthly)}
            onChange={(e) => setMonthly(parseAmount(e.target.value) ?? 0)}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="budget-amount"
          className="mb-2 block text-sm font-medium"
        >
          Daily Budget
        </label>
        <div className="relative">
          <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text" />
          <input
            id="budget-amount"
            type="text"
            inputMode="numeric"
            placeholder="Amount"
            className="w-full rounded-2xl border border-muted-text p-3 pl-12 text-sm font-medium"
            value={formatAmount(daily)}
            onChange={(e) => {
              const nextDaily = parseAmount(e.target.value) ?? 0;
              setMonthly(nextDaily * daysInMonth);
            }}
          />
        </div>
      </div>
      <Button
        type="button"
        variant="black"
        size="sm"
        justify="center"
        onClick={handleCreate}
      >
        Create Budget
      </Button>
    </div>
  );
}
