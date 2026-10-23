/**
 * Formats a monetary amount into standard Indian Rupee notation
 * e.g., 185000 -> "Rs 1,85,000"
 */
export function formatRupees(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "Rs 0";
  }
  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  return `Rs ${numericAmount.toLocaleString("en-IN")}`;
}

/**
 * Formats a date string or Date object into human-readable format
 * e.g., "2027-04-05" -> "5 Apr 2027", or keeps existing "5 Apr 2027"
 */
export function formatDate(value) {
  if (!value) return "";
  // If already formatted like "5 Apr 2027" or "5 April 2027", return as is
  if (typeof value === "string" && !/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value;
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) return String(value);

  const day = date.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Returns true if the ISO date string is today or later in local calendar dates
 * e.g., "2026-11-08" -> true (if today is 2026-10-22)
 */
export function isUpcoming(dateString) {
  if (!dateString) return false;
  const parts = String(dateString).slice(0, 10).split("-").map(Number);
  if (parts.length < 3 || parts.some(isNaN)) return false;
  const [tYear, tMonth, tDay] = parts;

  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curDay = now.getDate();

  if (tYear !== curYear) return tYear > curYear;
  if (tMonth !== curMonth) return tMonth > curMonth;
  return tDay >= curDay;
}

