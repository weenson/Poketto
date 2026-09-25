import Button from "@/components/button";
import { Goal } from "lucide-react";
import GoalList from "@/features/savings/components/goal-list";
import HeroCard from "@/features/savings/components/hero-card";
import Link from "next/link";
import { Toaster } from "sonner";
import SuccessToast from "@/features/home/components/success-toast";
import { getSavingsGoals, getTotalSavings } from "@/features/savings/queries";

export default async function SavingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const goals = await getSavingsGoals();
  const total = await getTotalSavings();

  return (
    <>
      <Toaster position="top-center" richColors />
      <SuccessToast
        show={
          success === "created" ||
          success === "updated" ||
          success === "deleted"
        }
        link={"/savings"}
        title={
          success === "created"
            ? "Goals created"
            : success === "updated"
              ? "Goals updated"
              : "Goals deleted"
        }
      />
      <section>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">My Savings </h1>
          <div className="text-sm">
            <Link href={"savings/new"}>
              <Button variant="black" size="sm" justify="center">
                <Goal className="w-5 h-5 mr-2" />
                New Goal
              </Button>
            </Link>
          </div>
        </div>
        <HeroCard total={total ?? 0} />
        <GoalList goals={goals ?? []} />
      </section>
    </>
  );
}
