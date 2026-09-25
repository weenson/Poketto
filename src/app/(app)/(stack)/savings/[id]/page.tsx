import { getSavingsGoalById } from "@/features/savings/queries";
import { fetchTransactionById } from "@/features/transactions/queries";
import { notFound } from "next/navigation";
import GoalDetailHero from "@/features/savings/components/goal-detail-hero";
import TransactionList from "@/features/home/components/transaction-list";
import {
  GoalDetailAction,
  GoalDetailDesktopActions,
} from "@/features/savings/components/goal-detail-action";

export default async function SavingsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const goal = await getSavingsGoalById(id);
  const transaction = await fetchTransactionById(id);
  if (!goal) notFound();
  return (
    <div>
      <GoalDetailHero
        goal={goal}
        actions={<GoalDetailDesktopActions id={id} />}
      />
      <TransactionList transactions={transaction} />
      <GoalDetailAction id={id} />
    </div>
  );
}
