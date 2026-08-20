export function formatDateToText(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
    })
    .toUpperCase();
}
