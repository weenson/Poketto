export function formatDateToText(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
    })
    .toUpperCase();
}

export function formatDateForInput(date: Date | null) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatAmount(value: number | null) {
  if (value === null) return "";
  return value?.toLocaleString("id-ID");
}

export function formatAmountCompact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toLocaleString("id-ID");
}

export function parseAmount(value: string): number | null {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

export function percentProgress(a: number, b: number): number {
  return Math.min((a / b) * 100);
}
