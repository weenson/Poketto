"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function getSavingsGoals() {
  const session = await getSession();
  if (!session) return;

  const goals = await prisma.savings.findMany({
    take: 10,
    where: { userId: session.user.id },
    select: {
      id: true,
      title: true,
      goalAmount: true,
      imageUrl: true,
    },
  });

  const totals = await prisma.transaction.groupBy({
    by: ["savingsId"],
    where: {
      userId: session.user.id,
    },
    _sum: { amount: true },
  });

  const totalById = new Map(
    totals.map((t) => [t.savingsId, t._sum.amount ?? 0]),
  );

  return goals.map((goal) => ({
    id: goal.id,
    name: goal.title,
    goalAmount: goal.goalAmount,
    currentAmount: totalById.get(goal.id) ?? 0,
  }));
}
