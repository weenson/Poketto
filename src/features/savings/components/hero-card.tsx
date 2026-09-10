import { percentProgress } from "@/utils/format-helper";

export default function HeroCard() {
  return (
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
  );
}
