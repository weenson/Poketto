"use client";

import { useState } from "react";
import { Goal, Calendar } from "lucide-react";
import Button from "@/components/button";
import { formatAmount, parseAmount } from "@/utils/format-helper";

export default function SavingsForm() {
  const [amount, setAmount] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Goal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
        <input
          type="text"
          placeholder="Goal title"
          className="w-full border border-muted-text rounded-2xl p-3 pl-12 font-medium text-sm"
        />
      </div>
      <div className="relative">
        <p className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text">
          Rp
        </p>
        <input
          type="text"
          inputMode="numeric"
          value={formatAmount(amount)}
          onChange={(e) => setAmount(parseAmount(e.target.value))}
          placeholder="Amount"
          className="w-full border border-muted-text rounded-2xl p-3 pl-12 font-medium text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="deadline"
          className="mb-2 block text-sm font-medium text-muted-text"
        >
          Deadline
        </label>
        <div className="relative">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            id="deadline"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            className="w-full border border-muted-text rounded-2xl p-3 pl-12 font-medium text-sm"
          />
        </div>
      </div>
      <Button variant="black" size="sm" justify="center">
        Create
      </Button>
    </div>
  );
}
