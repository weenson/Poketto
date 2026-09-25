import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function fetchTransaction() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  return await prisma.transaction.findMany({
    take: 10,
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      type: true,
      category: true,
      amount: true,
      notes: true,
      createdAt: true,
      savings: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchTransactionById(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return prisma.transaction.findMany({
    where: { userId: session.user.id, savingsId: id },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      type: true,
      category: true,
      amount: true,
      notes: true,
      createdAt: true,
    },
  });
}

export async function getBalance() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const total = await prisma.transaction.groupBy({
    by: ["type"],
    where: { userId: session.user.id },
    _sum: {
      amount: true,
    },
  });

  const income = total.find((t) => t.type === "INCOME")?._sum.amount ?? 0;
  const expense = total.find((t) => t.type === "EXPENSE")?._sum.amount ?? 0;

  return income - expense;
}
