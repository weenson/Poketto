import {
  ChevronRight,
  BanknoteCheck,
  ShoppingBag,
  CircleX,
} from "lucide-react";

type Transactions = {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: "income" | "expense";
};

export const transactions: Transactions[] = [
  {
    id: 1,
    title: "Salary",
    description: "Monthly salary.",
    amount: 8000000,
    date: new Date("2026-08-24"),
    type: "income",
  },
  {
    id: 2,
    title: "Groceries",
    description: "Shopping for groceries.",
    amount: 500000,
    date: new Date("2026-08-26"),
    type: "expense",
  },
];

export default function TransactionList() {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-black font-medium">Recent Transactions</p>
        <p className="flex items-center gap-1">
          View all{" "}
          <span>
            <ChevronRight size={16} />
          </span>
        </p>
      </div>
      <div>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-4 gap-2 max-w-xs mx-auto md:max-w-md md:mx-auto">
            <CircleX className="w-10 h-10 text-muted-text" />
            <div className="text-center">
              <p className="text-muted-text font-medium text-md">
                No transactions found.
              </p>
              <p className="text-muted-text text-sm">
                Your transactions will be tracked here. Create your first
                transaction now.
              </p>
            </div>
          </div>
        ) : (
          transactions.map((item) => (
            <div key={item.id} className="mt-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.type === "income" ? (
                    <div className="bg-success p-4 rounded-full">
                      <BanknoteCheck className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="bg-danger p-4 rounded-full">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-black font-medium">{item.title}</p>
                    <p className="text-muted-text text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p
                    className={`font-bold text-lg ${item.type === "income" ? "text-success" : "text-danger"}`}
                  >
                    {item.type === "income" ? "+" : "-"} Rp{" "}
                    {item.amount.toLocaleString()}
                  </p>
                  <p className="text-muted-text text-sm">
                    {item.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
