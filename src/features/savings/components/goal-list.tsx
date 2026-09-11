import { CircleX, PiggyBank } from "lucide-react";
import { formatAmountCompact, percentProgress } from "@/utils/format-helper";

export type SavingsGoal = {
  id: string;
  name: string;
  goalAmount: number;
  currentAmount: number;
};

export default function GoalList({ goals }: { goals: SavingsGoal[] }) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-black font-medium">My Goals</p>
        <p className="text-primary text-sm font-bold">See all</p>
      </div>
      <div>
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-4 gap-2 max-w-xs mx-auto md:max-w-md md:mx-auto">
            <CircleX className="w-10 h-10 text-muted-text" />
            <div className="text-center">
              <p className="text-muted-text font-medium text-md">
                No goals yet.
              </p>
              <p className="text-muted-text text-sm">
                Your savings goals will show up here. Create your first goal
                now.
              </p>
            </div>
          </div>
        ) : (
          goals.map((item) => {
            const progress = percentProgress(
              item.currentAmount,
              item.goalAmount,
            );

            return (
              <div key={item.id} className="mt-4 flex items-start gap-2">
                <div className="bg-muted p-4 rounded-2xl">
                  <PiggyBank className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-black font-medium">{item.name}</p>
                      <p className="text-muted-text text-xs">
                        Rp {formatAmountCompact(item.currentAmount)} of Rp{" "}
                        {formatAmountCompact(item.goalAmount)}
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
            );
          })
        )}
      </div>
    </section>
  );
}
