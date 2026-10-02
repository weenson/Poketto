"use client";

import LoadMore from "@/components/load-more";
import GoalList from "./goal-list";
import { getSavingsGoals } from "../queries";
import type { SavingsGoal } from "./goal-list";

export default function GoalListWithMore({
  initialGoals,
  status,
}: {
  initialGoals: SavingsGoal[];
  status: "ACTIVE" | "COMPLETED";
}) {
  return (
    <LoadMore
      initialItems={initialGoals}
      loadPage={async (page) => (await getSavingsGoals(status, page)) ?? []}
    >
      {(items) => <GoalList goals={items} />}
    </LoadMore>
  );
}
