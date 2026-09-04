import BottomNav from "@/components/nav/bottom-nav";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
