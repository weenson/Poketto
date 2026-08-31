import { formatDateToText } from "@/utils/format-helper";
import BalanceCard from "@/features/home/components/balance-card";
import TransactionList from "@/features/home/components/transaction-list";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import Button from "@/components/button";
import { getSession } from "@/lib/session";
import { TRANSACTION_ROUTES } from "@/features/transactions/constants";
import Link from "next/link";

export default async function Home() {
  const date = new Date();
  const formattedDate = formatDateToText(date);
  const session = await getSession();
  const name = session?.user.name;
  return (
    <div>
      <section>
        <div>
          <p className="text-muted-text text-xs font-bold">{formattedDate}</p>
          <h1 className="text-2xl font-bold">
            Hello, <span className="text-primary">{name}</span> <span>👋</span>
          </h1>
          <p className="text-muted-text text-sm">Ready to track your money!</p>
        </div>
        <div className="flex gap-2 mt-8 w-full">
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

      <BalanceCard />
      <TransactionList />
    </div>
  );
}
