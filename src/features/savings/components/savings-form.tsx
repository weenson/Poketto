"use client";

import { useState } from "react";
import { Goal, Calendar } from "lucide-react";
import Button from "@/components/button";
import {
  formatAmount,
  parseAmount,
  formatDateForInput,
} from "@/utils/format-helper";
import { createGoals } from "@/features/savings/actions";
import ImageUpload from "./image-upload";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function SavingsForm() {
  const [title, setTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!title || !goalAmount || !deadline) {
      return;
    }
    setLoading(true);
    try {
      await createGoals({
        title,
        goalAmount,
        endDate: deadline,
        imageUrl: undefined,
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex text-center justify-center">
        <ImageUpload value={imageUrl} onChange={setImageUrl} />
      </div>
      <div className="relative">
        <Goal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={formatAmount(goalAmount)}
          onChange={(e) => setGoalAmount(parseAmount(e.target.value))}
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
            value={formatDateForInput(deadline)}
            onChange={(e) => setDeadline(new Date(e.target.value))}
            min={new Date().toISOString().slice(0, 10)}
            className="w-full border border-muted-text rounded-2xl p-3 pl-12 font-medium text-sm"
          />
        </div>
      </div>
      <Button
        variant="black"
        size="sm"
        justify="center"
        disabled={loading}
        onClick={handleSave}
      >
        Create
      </Button>
    </div>
  );
}
