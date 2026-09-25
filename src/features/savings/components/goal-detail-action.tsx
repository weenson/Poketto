"use client";

import Button from "@/components/button";
import { Trash, Edit } from "lucide-react";
import Link from "next/link";
import { inactivateGoals } from "@/features/savings/actions";

export function GoalDetailAction({ id }: { id: string }) {
  const handleDelete = async () => {
    await inactivateGoals(id);
  };
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white flex items-center gap-2 w-full p-4">
      <div className="flex-1">
        <Button
          variant="muted"
          size="md"
          justify="center"
          onClick={handleDelete}
        >
          <Trash className="w-5 h-5 mr-2" />
          <span className="text-sm">Delete</span>
        </Button>
      </div>
      <div className="flex-1">
        <Link href={`/savings/${id}/edit`}>
          <Button variant="black" size="md" justify="center">
            <span className="text-sm">Edit</span>
            <Edit className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function GoalDetailDesktopActions({ id }: { id: string }) {
  async function handleDelete() {
    await inactivateGoals(id);
  }
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button variant="muted" size="sm" justify="center" onClick={handleDelete}>
        <Trash className="h-4 w-4 mr-2" />
        <span className="text-sm">Delete</span>
      </Button>
      <Link href={`/savings/${id}/edit`}>
        <Button variant="black" size="sm" justify="center">
          <Edit className="h-4 w-4 mr-2" />
          <span className="text-sm">Edit</span>
        </Button>
      </Link>
    </div>
  );
}
