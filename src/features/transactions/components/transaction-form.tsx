"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { formatAmount, parseAmount } from "@/utils/format-helper";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";

type TransactionFormProps = {
  type: "expense" | "income";
  heading: string;
};

export default function TransactionForm({
  type,
  heading,
}: TransactionFormProps) {
  const [amount, setAmount] = useState<number | undefined>();
  const [notes, setNotes] = useState<string>("");

  const categories = TRANSACTION_ROUTES[type].transactionCategories;
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center mb-3">
          <div className="bg-muted p-2 rounded-lg">
            <Link href="/">
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">{heading}</h1>
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={formatAmount(amount)}
          onChange={(e) => setAmount(parseAmount(e.target.value))}
          className="bg-muted p-5 rounded-lg font-bold text-xl"
          placeholder="Rp 0"
          step="none"
        />
      </div>
      <div className="flex flex-row gap-4 mt-4 overflow-x-auto scrollbar-none">
        {categories.map(({ icon: Icon, label, value, color }) => (
          <div
            key={value}
            className={`flex flex-col gap-2 items-center justify-center`}
          >
            <div
              className={`rounded-lg cursor-pointer ${color} w-16 h-16 flex items-center justify-center`}
            >
              <Icon className="text-white w-8 h-8" />
            </div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-4">
        <Pencil className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text  group-focus-within:text-primary" />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes..."
          className="w-full border-2 border-muted rounded-lg p-4 pl-12 font-medium outline-primary focus:border-primary focus:text-black"
        />
      </div>
    </div>
  );
}
