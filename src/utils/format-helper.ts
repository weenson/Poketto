export function formatDateToText(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
    })
    .toUpperCase();
}

export function formatAmount(value: number | undefined) {
  if (value === undefined) return "";
  return value.toLocaleString("id-ID");
}

export function parseAmount(value: string): number | undefined {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
}
