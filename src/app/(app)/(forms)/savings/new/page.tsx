import ImageUpload from "./image-upload";
import SavingsForm from "@/features/savings/components/savings-form";

export default function SavingsNewForm() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Create Goal</h1>

      <section className="flex text-center justify-center">
        <ImageUpload />
      </section>
      <section className="mt-4">
        <SavingsForm />
      </section>
    </div>
  );
}
