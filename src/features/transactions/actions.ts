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
  savingsId?: string;
};

export async function createTransaction(data: TransactionProps) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  if (typeof data.amount !== "number")
    throw new Error("Amount must be a number");

  if (data.amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (typeof data.category !== "string" || !data.category.trim()) {
    throw new Error("Category is required");
  }

  if (data.type !== "INCOME" && data.type !== "EXPENSE") {
    throw new Error("Invalid transaction type");
  }

  if (data.type === "EXPENSE" && data.savingsId) {
    const goal = await prisma.savings.findFirst({
      where: { id: data.savingsId, userId: session.user.id },
      select: { id: true },
    });
    if (!goal) throw new Error("Goal not found");

    const total = await prisma.transaction.groupBy({
      by: ["type"],
      where: { userId: session.user.id, savingsId: goal.id },
      _sum: {
        amount: true,
      },
    });

    const income = total.find((t) => t.type === "INCOME")?._sum.amount ?? 0;
    const expense = total.find((t) => t.type === "EXPENSE")?._sum.amount ?? 0;

    const balance = income - expense;
    if (data.amount > balance) {
      throw new Error("Amount exceeds goal balance");
    }
  }

  await prisma.transaction.create({
    data: {
      userId: session.user.id,
      type: data.type,
      category: data.category,
      amount: data.amount,
      notes: data.notes,
      savingsId: data.savingsId,
    },
  });

  revalidatePath("/");
  redirect("/?success=true");
}
