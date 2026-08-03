export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@bajrangpainters.com";

export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91-9891623038";

export const CONTACT_PHONE_TEL = CONTACT_PHONE.replace(/[^+\d]/g, "");
