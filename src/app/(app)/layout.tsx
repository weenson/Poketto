import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import BottomNav from "@/components/nav/bottom-nav";
import SideNav from "@/components/nav/side-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <SideNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
