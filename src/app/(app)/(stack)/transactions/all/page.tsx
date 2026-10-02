import { fetchTransaction } from "@/features/transactions/queries";
import TransactionWithLoadMore from "@/features/home/components/transaction-with-load-more";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function TransactionsAllPage() {
  const transaction = await fetchTransaction();
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-muted p-2.5 transition hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-2xl font-semibold">
          Transactions
        </h1>
      </div>
      <TransactionWithLoadMore intitialTransactions={transaction} />
    </>
  );
}
