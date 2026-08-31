import TransactionForm from "@/features/transactions/components/transaction-form";
import {
  TRANSACTION_ROUTES,
  TransactionRoutesType,
} from "@/features/transactions/constants";
import { notFound } from "next/navigation";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!(type in TRANSACTION_ROUTES)) {
    notFound();
  }

  const config = TRANSACTION_ROUTES[type as TransactionRoutesType];

  return <TransactionForm type={config.dbType} heading={config.heading} />;
}
