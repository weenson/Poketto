import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import DeleteAccountForm from "@/features/profile/components/delete-account-form";

export default async function DeleteAccountPage() {
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
          Delete account
        </h1>
      </div>
      <DeleteAccountForm />
    </div>
  );
}
