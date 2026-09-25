import { CircleX } from "lucide-react";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";
import { Goal } from "lucide-react";

type TransactionsType = {
  id: string;
  category: string;
  notes: string | null;
  amount: number;
  createdAt: Date;
  type: "INCOME" | "EXPENSE";
  savings?: {
    id: string;
    title: string;
  } | null;
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
            const key = item.type === "INCOME" ? "income" : "expense";
            const category = TRANSACTION_ROUTES[key].transactionCategories.find(
              (c) => c.value === item.category,
            );
            const Icon = category?.icon;

            const typeStyle =
              item.type === "INCOME"
                ? {
                    amountClass: "text-success",
                    sign: "+",
                    goalGradient: "from-primary/15 to-primary/0",
                    goalIconClass: "text-primary",
                    goalLabel: "Added to",
                  }
                : {
                    amountClass: "text-danger",
                    sign: "-",
                    goalGradient: "from-danger/15 to-danger/0",
                    goalIconClass: "text-danger",
                    goalLabel: "Deducted from",
                  };

            return (
              <div
                key={item.id}
                className="mt-4 bg-white rounded-2xl p-4 shadow-sm shadow-primary/20"
              >
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
                    <p className={`font-bold ${typeStyle.amountClass}`}>
                      {typeStyle.sign} Rp {item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                {item.savings && (
                  <div className="mt-2">
                    <div
                      className={`bg-linear-to-r rounded-2xl px-4 py-2 ${typeStyle.goalGradient}`}
                    >
                      <span className="flex items-center gap-2">
                        <Goal
                          className={`w-4 h-4 ${typeStyle.goalIconClass}`}
                        />{" "}
                        <div className="text-xs line-clamp-1">
                          <span className="font-semibold">
                            Rp {item.amount.toLocaleString()}
                          </span>{" "}
                          - {typeStyle.goalLabel} -{" "}
                          <span className="font-semibold">
                            {item.savings.title}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
