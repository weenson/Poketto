import { PiggyBank, TrendingUp, ClockFading } from "lucide-react";
import { formatAmountCompact, percentProgress } from "@/utils/format-helper";
import type { SavingsGoal } from "./goal-list";

export default function GoalListCard({ goal }: { goal: SavingsGoal }) {
  const progress = percentProgress(goal.currentAmount, goal.goalAmount);
  const remainingAmount = goal.goalAmount - goal.currentAmount;
  const remainingAmountVisible = progress >= 90;

  const today = new Date();
  const remainingDays =
    goal.endDate != null
      ? Math.ceil(
          (new Date(goal.endDate).getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : null;
  const remainingDaysVisible = remainingDays != null && remainingDays <= 5;

  const chip = remainingDaysVisible
    ? {
        label:
          remainingDays === 0
            ? "Due today!"
            : remainingDays === 1
              ? "Hurry up..! 1 day left!"
              : `Hurry up..! ${remainingDays} days left!`,
        gradient: "from-danger/15 to-danger/0",
        iconClass: "text-danger",
        Icon: ClockFading,
      }
    : remainingAmountVisible
      ? {
          label: `Just Rp ${formatAmountCompact(remainingAmount)} to go!`,
          gradient: "from-primary/15 to-primary/0",
          iconClass: "text-primary",
          Icon: TrendingUp,
        }
      : null;

  return (
    <div>
      {chip && (
        <div className="mb-2">
          <div
            className={`bg-linear-to-r rounded-2xl px-4 py-2 ${chip.gradient}`}
          >
            <span className="flex items-center gap-2">
              <chip.Icon className={`w-4 h-4 ${chip.iconClass}`} />
              <div className="text-xs line-clamp-1">
                <span>{chip.label}</span>
              </div>
            </span>
          </div>
        </div>
      )}
      <div className="flex items-start gap-2">
        <div className="bg-muted p-4 rounded-2xl">
          <PiggyBank className="h-6 w-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-black font-medium">{goal.name}</p>
              <p className="text-muted-text text-xs">
                Rp {formatAmountCompact(goal.currentAmount)} of Rp{" "}
                {formatAmountCompact(goal.goalAmount)}
              </p>
            </div>
            <p className="shrink-0 font-bold text-primary">
              {Math.round(progress)}%
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
