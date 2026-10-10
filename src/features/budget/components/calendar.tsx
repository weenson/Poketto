export default function Calendar() {
  const offset = [-2, -1, 0, 1, 2];

  return (
    <div className="bg-muted w-full rounded-2xl flex gap-2 p-4">
      {offset.map((offset) => {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        const isToday = offset === 0;
        return (
          <div
            key={offset}
            className={`flex-1 rounded-2xl p-2 text-center ${
              isToday ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <p className="font-medium">{d.getDate()}</p>
            <p
              className={`text-sm ${isToday ? "text-white" : "text-muted-text"}`}
            >
              {d.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
