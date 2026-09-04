"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type TransactionProps = {
  type: "EXPENSE" | "INCOME";
  category: string;
  amount: number;
  notes?: string;
};

export async function createTransaction(data: TransactionProps) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.transaction.create({
    data: {
      userId: session.user.id,
      type: data.type,
      category: data.category,
      amount: data.amount,
      notes: data.notes,
    },
  });

  revalidatePath("/");
  redirect("/?success=true");
}
