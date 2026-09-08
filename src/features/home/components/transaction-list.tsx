import { CircleX } from "lucide-react";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";

type TransactionsType = {
  id: string;
  category: string;
  notes: string | null;
  amount: number;
  createdAt: Date;
  type: "INCOME" | "EXPENSE";
};

export default async function TransactionList({
  transactions,
}: {
  transactions: TransactionsType[];
}) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-black font-medium">Recent Transactions</p>
        <p className="text-primary text-sm font-bold">See all</p>
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
          transactions.map((item) => {
            function getCategory(type: "INCOME" | "EXPENSE", category: string) {
              const key = type === "INCOME" ? "income" : "expense";
              return TRANSACTION_ROUTES[key].transactionCategories.find(
                (c) => c.value === category,
              );
            }

            const category = getCategory(item.type, item.category);
            const Icon = category?.icon;
            return (
              <div key={item.id} className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-muted p-4 rounded-2xl">
                      {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
                    </div>

                    <div className="flex flex-col">
                      <p className="text-black font-medium">
                        {category?.label}
                      </p>
                      <p className="text-muted-text text-xs">{item.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1">
                    <p
                      className={`font-bold ${item.type === "INCOME" ? "text-success" : "text-danger"}`}
                    >
                      {item.type === "INCOME" ? "+" : "-"} Rp{" "}
                      {item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
