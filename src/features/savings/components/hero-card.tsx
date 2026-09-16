import { percentProgress, formatAmountCompact } from "@/utils/format-helper";
import { TrendingUp, Goal } from "lucide-react";

type HeroCardProps = {
  total: {
    currentAmount: number;
    goalAmount: number;
    activeGoalsCount: number;
  };
};

export default function HeroCard({ total }: HeroCardProps) {
  return (
    <>
      <div className="bg-primary p-4 rounded-2xl mt-4">
        <div className="flex flex-row justify-between text-white text-sm">
          <div>
            <p>Total Saving</p>
            <p className="font-semibold text-2xl">
              Rp {formatAmountCompact(total.currentAmount)}
            </p>
          </div>
          <div>
            <p>Target Saving</p>
            <p className="font-semibold text-2xl">
              {" "}
              Rp {formatAmountCompact(total.goalAmount)}
            </p>
          </div>
        </div>
        <div className="relative w-full mt-6">
          <div className="bg-white/30 h-3 rounded-full overflow-hidden">
            <div
              className="bg-white h-full"
              style={{
                width: `${percentProgress(total.currentAmount, total.goalAmount)}%`,
              }}
            />
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2 h-6 w-2 rounded-lg bg-white"
            style={{
              left: `calc(${percentProgress(total.currentAmount, total.goalAmount)}% - 5px)`,
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-row gap-2 bg-muted p-4 rounded-2xl">
          <div className="flex flex-col bg-white p-3 flex-1 rounded-2xl items-center">
            <p className="text-xl font-bold flex flex-row items-center gap-1">
              <span className="text-primary">
                <TrendingUp size={24} />
              </span>
              {Math.round(
                percentProgress(total.currentAmount, total.goalAmount),
              )}
              %
            </p>
            <p className="text-sm text-muted-text">Saving rate</p>
          </div>
          <div className="flex flex-col bg-white p-3 flex-1 rounded-2xl items-center">
            <p className="text-xl font-bold flex flex-row items-center gap-1">
              <span className="text-primary">
                <Goal size={24} />
              </span>
              {total.activeGoalsCount}
            </p>
            <p className="text-sm text-muted-text">Goals</p>
          </div>
        </div>
      </div>
    </>
  );
}
