import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-dvh">
      <div className="flex flex-1 items-center justify-center px-4 py-8 md:max-w-md">
        <div className="w-full max-w-sm">{children}</div>
      </div>

      <div className="hidden flex-1 flex-col items-center justify-center gap-6 bg-primary md:flex">
        <p className="text-5xl font-bold text-white">Poketto</p>
        <p className="max-w-xs text-center text-white/75">
          Track your money, own your future.
        </p>
      </div>
    </div>
  );
}
