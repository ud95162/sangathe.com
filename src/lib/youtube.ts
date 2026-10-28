import type { Photo } from "@/lib/types";

/** Extracts the video id from a pasted YouTube link (watch, youtu.be, shorts, embed) or a bare id. */
export function parseYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1, 12) || null;
    if (/(^|\.)youtube(-nocookie)?\.com$/.test(url.hostname)) {
      const v = url.searchParams.get("v");
      if (v) return v;
      const m = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/);
      if (m) return m[1];
    }
  } catch {
    /* not a URL */
  }
  return null;
}

/** YouTube's own thumbnail, used when the editor has not uploaded a custom one. */
export function youTubeThumbnail(id: string, size: "maxres" | "mq" = "mq", alt = ""): Photo {
  return { src: `https://i.ytimg.com/vi/${id}/${size}default.jpg`, alt };
}

/** Privacy-friendly embed URL (no YouTube cookies until the visitor plays). */
export const youTubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
