"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type CreateBudgetProps = {
  amount: number;
};

export async function createBudget({ amount }: CreateBudgetProps) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  if (!amount || amount <= 0) throw new Error("Amount is required");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  await prisma.budget.upsert({
    where: {
      userId_year_month: {
        userId: session.user.id,
        year,
        month,
      },
    },
    create: {
      userId: session.user.id,
      amount,
      year,
      month,
    },
    update: { amount },
  });

  revalidatePath("/budget");
  redirect("/budget");
}
