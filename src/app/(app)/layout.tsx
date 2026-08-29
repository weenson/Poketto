import BottomNav from "@/components/nav/bottom-nav";
import SideNav from "@/components/nav/side-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <SideNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
