// Shared by the enquiry form (in the browser) and /api/enquiry (on the server),
// so both agree on what a valid enquiry is.

// 10-digit Indian mobile numbers, with or without +91 / 0.
export function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

// An Indian mobile, or an international number written with its + country code
// (visitors abroad, family members buying for a home here).
export function isValidPhone(raw: string) {
  const text = raw.trim();
  if (/^[6-9]\d{9}$/.test(normalisePhone(text))) return true;
  const digits = text.replace(/\D/g, "");
  return text.startsWith("+") && !text.startsWith("+91") && digits.length >= 8 && digits.length <= 15;
}
