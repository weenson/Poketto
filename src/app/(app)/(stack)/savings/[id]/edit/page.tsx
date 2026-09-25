import SavingsForm from "@/features/savings/components/savings-form";
import { getSavingsGoalById } from "@/features/savings/queries";

export default async function SavingsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const goal = await getSavingsGoalById(id);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Update Goal</h1>
      <section className="mt-4">
        <SavingsForm mode="edit" goal={goal ?? undefined} />
      </section>
    </div>
  );
}
