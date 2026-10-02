import { getSavingsGoals } from "@/features/savings/queries";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import GoalListWithMore from "@/features/savings/components/goal-list-with-more";

export default async function SavingsAllPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string; page?: string }>;
}) {
  const { status, page } = await searchParams;
  const goalStatus = status === "completed" ? "COMPLETED" : "ACTIVE";

  const goals = await getSavingsGoals(goalStatus, 1);
  if (!goals) return "No Goals";

  const current = status === "completed" ? "completed" : "active";

  const tabClass = (value: string) =>
    `flex-1 px-2 py-3 rounded-lg text-center ${
      current === value ? "bg-white shadow-sm" : ""
    }`;

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/savings"
          className="rounded-xl bg-muted p-2.5 transition hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-2xl font-semibold">
          Goals
        </h1>
      </div>
      <div className="bg-muted p-2 rounded-2xl flex gap-2 justify-between items-center">
        <Link className={tabClass("active")} href="/savings/all?status=active">
          Active
        </Link>
        <Link
          className={tabClass("completed")}
          href="/savings/all?status=completed"
        >
          Completed
        </Link>
      </div>
      <GoalListWithMore
        key={current}
        initialGoals={goals ?? []}
        status={goalStatus}
      />
    </>
  );
}
