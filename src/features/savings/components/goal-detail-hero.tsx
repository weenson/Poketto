import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  PiggyBank,
  TrendingUp,
  ClockFading,
} from "lucide-react";
import {
  formatAmount,
  formatAmountCompact,
  percentProgress,
} from "@/utils/format-helper";
import type { SavingsGoal } from "./goal-list";

export default function GoalDetailHero({
  goal,
  actions,
}: {
  goal: SavingsGoal;
  actions: React.ReactNode;
}) {
  const progress = Math.round(
    percentProgress(goal.currentAmount, goal.goalAmount),
  );
  const remainingAmount = Math.max(goal.goalAmount - goal.currentAmount, 0);

  const today = new Date();
  const remainingDays =
    goal.endDate != null
      ? Math.ceil(
          (new Date(goal.endDate).getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : null;

  const chip =
    remainingDays != null && remainingDays <= 5
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
      : progress >= 90
        ? {
            label:
              remainingAmount > 0
                ? `Just Rp ${formatAmountCompact(remainingAmount)} more to go..!`
                : "Goal reached!",
            gradient: "from-primary/15 to-primary/0",
            iconClass: "text-primary",
            Icon: TrendingUp,
          }
        : {
            label: `Rp ${formatAmountCompact(remainingAmount)} left to reach your goal`,
            gradient: "from-primary/15 to-primary/0",
            iconClass: "text-primary",
            Icon: TrendingUp,
          };

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/savings"
          className="rounded-xl bg-muted p-2.5 transition hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-2xl font-semibold">
          Goal detail
        </h1>
        {actions}
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div
          className={`inline-flex max-w-full items-center gap-2 rounded-full bg-linear-to-r px-4 py-2 ${chip.gradient}`}
        >
          <chip.Icon className={`h-4 w-4 shrink-0 ${chip.iconClass}`} />
          <span className="truncate text-sm text-black">{chip.label}</span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          {goal.imageUrl ? (
            <img
              src={goal.imageUrl}
              alt=""
              className="h-16 w-16 shrink-0 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <PiggyBank className="h-8 w-8 text-primary" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-black">
              {goal.name}
            </p>
            <p className="mt-1 text-base font-medium tabular-nums">
              <span className="text-black">
                <span className="md:hidden">
                  Rp {formatAmountCompact(goal.currentAmount)}
                </span>
                <span className="hidden md:inline">
                  Rp {formatAmount(goal.currentAmount)}
                </span>
              </span>
              <span className="text-muted-text"> / </span>
              <span className="text-primary">
                <span className="md:hidden">
                  Rp {formatAmountCompact(goal.goalAmount)}
                </span>
                <span className="hidden md:inline">
                  Rp {formatAmount(goal.goalAmount)}
                </span>
              </span>
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <p className="shrink-0 text-lg font-bold text-black">{progress}%</p>
          <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-primary/15">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
