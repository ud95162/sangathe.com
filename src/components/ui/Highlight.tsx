import { searchTerms } from "@/lib/search";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wraps the parts of `text` that match the search words in <mark>. */
export function Highlight({ text, query }: { text: string; query?: string }) {
  const terms = query ? searchTerms(query).sort((a, b) => b.length - a.length) : [];
  if (!terms.length) return text;
  // The lookahead keeps a Tamil vowel sign or virama attached to its consonant.
  const pattern = new RegExp(`(${terms.map(escape).join("|")})(?!\\p{M})`, "giu");
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded-sm bg-golden/40 px-0.5 text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
