"use client";

import type { TransactionsType } from "@/features/home/components/transaction-list";
import { fetchTransaction } from "@/features/transactions/queries";
import LoadMore from "@/components/load-more";
import TransactionList from "@/features/home/components/transaction-list";

export default function TransactionWithLoadMore({
  intitialTransactions,
}: {
  intitialTransactions: TransactionsType[];
}) {
  return (
    <LoadMore
      initialItems={intitialTransactions}
      loadPage={async (page) => (await fetchTransaction(page)) ?? []}
    >
      {(items) => <TransactionList transactions={items} groupByMonth />}
    </LoadMore>
  );
}
