"use client";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function RadialChart() {
  const percentage = 32;
  const data = [{ name: "spent", value: percentage, fill: "#1fcd9f" }];

  return (
    <div className="relative h-36 w-full overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={data}
            cx="50%"
            cy="85%"
            innerRadius="60%"
            outerRadius="90%"
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" background={{ fill: "#1fcd9f40" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center">
        <p className="text-2xl font-bold tracking-tight">{percentage}%</p>
        <p className="text-sm text-muted-text">Rp 1.2M / Rp 4M</p>
      </div>
    </div>
  );
}
