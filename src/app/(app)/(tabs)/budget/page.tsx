import Button from "@/components/button";
import Link from "next/link";
import RadialChart from "@/features/budget/components/radial-chart";
import Calendar from "@/features/budget/components/calendar";
import BudgetChip from "@/features/budget/components/budget-chip";

export default function BudgetPage() {
  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Budget </h1>
        <div className="text-sm">
          <Link href={"budget/create"}>
            <Button variant="black" size="sm" justify="center">
              Manage
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <RadialChart />
      </div>
      <div>
        <Calendar />
      </div>
      <div className="mt-3">
        <BudgetChip />
      </div>
    </section>
  );
}
