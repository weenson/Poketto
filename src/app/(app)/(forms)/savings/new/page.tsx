import SavingsForm from "@/features/savings/components/savings-form";
import { toast } from "sonner";

export default function SavingsNewForm() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Create Goal</h1>
      <section className="mt-4">
        <SavingsForm mode="create" />
      </section>
    </div>
  );
}
