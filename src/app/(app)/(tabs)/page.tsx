import { formatDateToText } from "@/utils/format-helper";
import BalanceCard from "@/features/home/components/balance-card";
import TransactionList from "@/features/home/components/transaction-list";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import Button from "@/components/button";
import { fetchTransaction, getBalance } from "@/features/transactions/queries";
import { getSession } from "@/lib/session";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";
import Link from "next/link";
import { Toaster } from "sonner";
import SuccessToast from "@/features/home/components/success-toast";
import GoalCompleteModal from "@/features/home/components/goal-complete-modal";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; goalComplete?: string }>;
}) {
  const { success, goalComplete } = await searchParams;
  const date = new Date();
  const formattedDate = formatDateToText(date);

  const [session, balance, transactions] = await Promise.all([
    getSession(),
    getBalance(),
    fetchTransaction(),
  ]);

  const name = session?.user.name;

  return (
    <div>
      <Toaster position="top-center" richColors />
      <SuccessToast
        show={success === "true"}
        link={"/"}
        title={"Transaction Saved"}
      />
      <GoalCompleteModal title={goalComplete} />
      <section>
        <div>
          <p className="text-muted-text text-xs font-bold">{formattedDate}</p>
          <h1 className="text-2xl font-bold">
            Hello, <span className="text-primary">{name}</span> <span>👋</span>
          </h1>
          <p className="text-muted-text text-sm">Ready to track your money!</p>
        </div>
        <BalanceCard balance={balance ?? 0} />
        <div className="flex gap-2 mt-4 w-full">
          <Link href={TRANSACTION_ROUTES.expense.href} className="flex-1">
            <Button variant="black" size="md" justify="center">
              <BanknoteArrowDown className="w-5 h-5 mr-2" />
              Spend
            </Button>
          </Link>

          <Link href={TRANSACTION_ROUTES.income.href} className="flex-1">
            <Button variant="primary" size="md" justify="center">
              <BanknoteArrowUp className="w-5 h-5 mr-2" />
              Income
            </Button>
          </Link>
        </div>
      </section>
      <TransactionList transactions={transactions} />
    </div>
  );
}
