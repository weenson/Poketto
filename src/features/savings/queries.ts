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

  const transactions = await prisma.transaction.groupBy({
    by: ["savingsId", "type"],
    where: {
      userId: session.user.id,
    },
    _sum: { amount: true },
  });

  const incomeById = new Map(
    transactions
      .filter((t) => t.type === "INCOME" && t.savingsId)
      .map((t) => [t.savingsId!, t._sum.amount ?? 0]),
  );

  const expenseById = new Map(
    transactions
      .filter((t) => t.type === "EXPENSE" && t.savingsId)
      .map((t) => [t.savingsId!, t._sum.amount ?? 0]),
  );

  return goals.map((goal) => ({
    id: goal.id,
    name: goal.title,
    goalAmount: goal.goalAmount,
    currentAmount:
      (incomeById.get(goal.id) ?? 0) - (expenseById.get(goal.id) ?? 0),
  }));
}

export async function getSavingsGoalById(id: string) {
  const session = await getSession();
  if (!session) return;

  return prisma.savings.findFirst({
    where: { userId: session.user.id, id: id },
    select: {
      id: true,
      title: true,
      goalAmount: true,
      imageUrl: true,
      endDate: true,
    },
  });
}

export async function getTotalSavings() {
  const session = await getSession();
  if (!session) return { currentAmount: 0, goalAmount: 0, activeGoalsCount: 0 };

  const activeGoals = await prisma.savings.findMany({
    where: { userId: session.user.id, status: "ACTIVE" },
    select: { id: true, goalAmount: true },
  });

  const activeGoalsCount = activeGoals.length;

  const activeIds = activeGoals.map((g) => g.id);

  const incomeSum = await prisma.transaction.aggregate({
    where: {
      userId: session.user.id,
      savingsId: { in: activeIds },
      type: "INCOME",
    },
    _sum: { amount: true },
  });

  const expenseSum = await prisma.transaction.aggregate({
    where: {
      userId: session.user.id,
      savingsId: { in: activeIds },
      type: "EXPENSE",
    },
    _sum: { amount: true },
  });

  const currentAmount =
    (incomeSum._sum.amount ?? 0) - (expenseSum._sum.amount ?? 0);

  return {
    currentAmount: currentAmount,
    goalAmount: activeGoals.reduce((sum, g) => sum + g.goalAmount, 0),
    activeGoalsCount: activeGoalsCount ?? 0,
  };
}
