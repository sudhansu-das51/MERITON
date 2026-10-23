/**
 * Shared input validators for forms
 */

export function normalizePhone(value) {
  if (!value) return "";
  return String(value)
    .replace(/[\s\-+]/g, "")
    .replace(/^91/, "")
    .replace(/^0/, "");
}

export function validateName(value, label = "Name") {
  if (!value || String(value).trim().length < 2) {
    return `${label} must be at least 2 characters`;
  }
  return "";
}

export function validatePhone(value) {
  if (!value || !String(value).trim()) {
    return "Phone number is required";
  }
  const cleaned = normalizePhone(value);
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return "Enter a valid 10-digit Indian mobile number";
  }
  return "";
}

export function validateEmail(value) {
  if (!value || !String(value).trim()) {
    return ""; // Optional when empty
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(value).trim())) {
    return "Enter a valid email address";
  }
  return "";
}
