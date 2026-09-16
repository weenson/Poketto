"use client";

import { formatAmountCompact, percentProgress } from "@/utils/format-helper";
import { SavingsGoal } from "@/features/savings/components/goal-list";
import { PiggyBank } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type GoalCardProps = {
  goals: SavingsGoal[];
  selectedGoals: string;
  setSelectedGoals: (id: string) => void;
};

export default function GoalCard({
  goals,
  selectedGoals,
  setSelectedGoals,
}: GoalCardProps) {
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

  return (
    <div className="flex flex-col gap-3 md:gap-3">
      <div className="-mx-1 flex gap-3 overflow-x-auto px-2 py-2 scrollbar-none md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
        {goals.map((goal) => {
          const selected = selectedGoals === goal.id;
          const progress = Math.round(
            percentProgress(goal.currentAmount, goal.goalAmount),
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
                <GoalThumbnail src={goal.imageUrl ?? ""} alt={goal.name} />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium">{goal.name}</h3>
                  <p className="mt-0.5 text-sm tabular-nums text-muted-text">
                    Rp {currentLabel}{" "}
                    <span className="text-primary">/ Rp {goalLabel}</span>
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
  );
}
