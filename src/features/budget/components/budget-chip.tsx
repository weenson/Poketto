export default function BudgetChip() {
  return (
    <div className="bg-linear-to-r from-primary/25 to-primary/0 inline-flex w-full items-center gap-2 rounded-full px-4 py-2 justify-between">
      <p className="text-xs">
        You can spend{" "}
        <span className="text-primary font-semibold">Rp 200.000</span> today
      </p>
      <p className="text-sm">
        <span className="text-primary">●</span> Normal
      </p>
    </div>
  );
}
