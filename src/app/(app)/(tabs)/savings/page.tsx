import Button from "@/components/button";
import { Goal, TrendingUp } from "lucide-react";
import GoalList from "@/features/savings/components/goal-list";
import HeroCard from "@/features/savings/components/hero-card";
import Link from "next/link";

export default function SavingsPage() {
  const tempGoalsItem = [
    {
      id: 1,
      name: "Buy a new laptop",
      goalAmount: 13000000,
      currentAmount: 2500000,
      imageUrl: "",
    },
    {
      id: 2,
      name: "Travel to Japan",
      goalAmount: 40000000,
      currentAmount: 1200000,
      imageUrl: "",
    },
    {
      id: 3,
      name: "Buy Cimol",
      goalAmount: 12000,
      currentAmount: 1000,
      imageUrl: "",
    },
  ];

  return (
    <>
      <section>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">My Savings </h1>
          <div className="text-sm">
            <Link href={"savings/new"}>
              <Button variant="black" size="sm" justify="center">
                <Goal className="w-5 h-5 mr-2" />
                New Goal
              </Button>
            </Link>
          </div>
        </div>
        <HeroCard />
      </section>
      <section className="mt-4">
        <div className="flex flex-row gap-2 bg-muted p-4 rounded-2xl">
          <div className="flex flex-col bg-white p-3 flex-1 rounded-2xl items-center">
            <p className="text-xl font-bold flex flex-row items-center gap-1">
              <span className="text-primary">
                <TrendingUp size={24} />
              </span>
              66%
            </p>
            <p className="text-sm text-muted-text">Saving rate</p>
          </div>
          <div className="flex flex-col bg-white p-3 flex-1 rounded-2xl items-center">
            <p className="text-xl font-bold flex flex-row items-center gap-1">
              <span className="text-primary">
                <Goal size={24} />
              </span>
              3
            </p>
            <p className="text-sm text-muted-text">Goals</p>
          </div>
        </div>
      </section>
      <GoalList goals={tempGoalsItem} />
    </>
  );
}
