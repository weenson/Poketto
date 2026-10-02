import { CircleX } from "lucide-react";
import { percentProgress } from "@/utils/format-helper";
import GoalListCard from "./goal-list-card";
import Link from "next/link";

export type SavingsGoal = {
  id: string;
  name: string;
  goalAmount: number;
  currentAmount: number;
  endDate?: Date | null;
  imageUrl?: string | null;
  status: string;
};

export default function GoalList({ goals }: { goals: SavingsGoal[] }) {
  return (
    <section className="mt-4">
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
              <Link href={`/savings/${item.id}/`} key={item.id}>
                <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm shadow-primary/20">
                  <GoalListCard goal={item} />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
