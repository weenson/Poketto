"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type goalProps = {
  title: string;
  goalAmount: number;
  endDate?: Date;
  imageUrl?: string;
};

export async function createGoals(data: goalProps) {
  const session = await getSession();

  if (!session) throw new Error("Unauthorized");

  await prisma.savings.create({
    data: {
      userId: session.user.id,
      title: data.title,
      goalAmount: data.goalAmount,
      endDate: data.endDate,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/savings");
  redirect("/savings?success=created");
}

export async function updateGoals(id: string, data: goalProps) {
  const session = await getSession();

  if (!session) throw new Error("Unauthorized");

  await prisma.savings.update({
    where: { id, userId: session.user.id },
    data: {
      title: data.title,
      goalAmount: data.goalAmount,
      endDate: data.endDate,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/savings");
  redirect("/savings?success=updated");
}

export async function inactivateGoals(id: string) {
  const session = await getSession();

  if (!session) throw new Error("Unauthorized");

  await prisma.savings.update({
    where: { id, userId: session.user.id },
    data: {
      status: "INACTIVE",
    },
  });

  revalidatePath("/savings");
  redirect("/savings?success=deleted");
}
