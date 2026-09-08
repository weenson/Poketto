import Button from "@/components/button";
import { Goal, TrendingUp, ChevronRight, PiggyBank } from "lucide-react";
import { percentProgress } from "@/utils/format-helper";
import { formatAmountCompact } from "@/utils/format-helper";

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
            <Button variant="black" size="sm" justify="center">
              <Goal className="w-5 h-5 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
        <div className="bg-primary p-4 rounded-2xl mt-4">
          <div className="flex flex-row justify-between text-white text-sm">
            <div>
              <p>Total Saving</p>
              <p className="font-semibold text-2xl">Rp320.000</p>
            </div>
            <div>
              <p>Target Saving</p>
              <p className="font-semibold text-2xl">Rp1.5M</p>
            </div>
          </div>
          <div className="relative w-full mt-6">
            <div className="bg-white/30 h-3 rounded-full overflow-hidden">
              <div
                className="bg-white h-full"
                style={{ width: `${percentProgress(100000, 1000000)}%` }}
              />
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 h-6 w-2 rounded-lg bg-white"
              style={{
                left: `calc(${percentProgress(100000, 1000000)}% - 5px)`,
              }}
            />
          </div>
        </div>
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
      <section className="mt-4">
        <div className="flex justify-between">
          <p className="font-semibold">My Goals</p>
          <p className="flex flex-row items-center text-sm">
            Select <ChevronRight size={16} />
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          {tempGoalsItem.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                    <PiggyBank className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p>{item.name}</p>
                    <p className="font-semibold">
                      Rp {formatAmountCompact(item.currentAmount)} /{" "}
                      <span className="text-primary">
                        Rp {formatAmountCompact(item.goalAmount)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center gap-3">
                <p className="shrink-0 font-semibold">
                  {Math.round(
                    percentProgress(item.currentAmount, item.goalAmount),
                  )}
                  %
                </p>
                <div className="min-w-0 flex-1 bg-primary/15 h-4 rounded-full">
                  <div
                    className="bg-primary h-full rounded-lg"
                    style={{
                      width: `${percentProgress(item.currentAmount, item.goalAmount)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
