import { formatDateToText } from "@/lib/format-helper";
import BalanceCard from "@/components/home/balance-card";
import TransactionList from "@/components/home/transaction-list";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import Button from "@/components/button";

export default function Home() {
  const date = new Date();
  const formattedDate = formatDateToText(date);
  return (
    <div>
      <section>
        <div>
          <p className="text-muted-text text-xs font-bold">{formattedDate}</p>
          <h1 className="text-2xl font-bold">
            Hello, <span className="text-primary">Winson</span> <span>👋</span>
          </h1>
          <p className="text-muted-text text-sm">Ready to track your money!</p>
        </div>
        <div className="flex gap-2 mt-8 justify-center">
          <Button variant="black" size="md" justify="center">
            <BanknoteArrowDown className="w-5 h-5 mr-2" />
            Spend
          </Button>
          <Button variant="primary" size="md" justify="center">
            <BanknoteArrowUp className="w-5 h-5 mr-2" />
            Income
          </Button>
        </div>
      </section>

      <BalanceCard />
      <TransactionList />
    </div>
  );
}
