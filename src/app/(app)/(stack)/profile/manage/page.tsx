import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ManageAccountForm from "@/features/profile/components/manage-account-form";

export default async function ManageAccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/profile"
          className="rounded-xl bg-muted p-2.5 transition hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-2xl font-semibold">
          Manage account
        </h1>
      </div>
      <ManageAccountForm initialName={session.user.name} />
    </div>
  );
}
