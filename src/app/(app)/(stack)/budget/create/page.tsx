import BudgetForm from "@/features/budget/components/budget-form";

export default function CreateBudgetPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Create Budget</h1>
      <section className="mt-4">
        <BudgetForm />
      </section>
    </div>
  );
}
