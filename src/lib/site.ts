export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sangathe.com";

/** Staging and demo builds stay hidden from search engines; set SITE_INDEXING=on for the live site. */
export const indexingEnabled = process.env.SITE_INDEXING === "on";

export type SocialId = "facebook" | "x" | "youtube" | "whatsapp" | "telegram";

/** Profile URLs are placeholders until the client supplies them. */
export const socialLinks: { id: SocialId; label: string; href: string }[] = [
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "x", label: "X", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "whatsapp", label: "WhatsApp", href: "#" },
  { id: "telegram", label: "Telegram", href: "#" },
];

/** Icon box size per network, taken from the approved design. */
export const iconSize: Record<SocialId, { header: number; footer: number; share: number }> = {
  facebook: { header: 22, footer: 20, share: 22 },
  x: { header: 20, footer: 18, share: 18 },
  youtube: { header: 24, footer: 22, share: 22 },
  whatsapp: { header: 22, footer: 20, share: 20 },
  telegram: { header: 22, footer: 20, share: 22 },
};
