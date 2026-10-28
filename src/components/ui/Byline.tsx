import Link from "next/link";
import type { Story } from "@/lib/types";

/** "Reporter name · time". The name links to the reporter's page when there is one. */
export function Byline({ story, className = "text-xs" }: { story: Pick<Story, "author" | "authorHref" | "timeLabel">; className?: string }) {
  const { author, authorHref, timeLabel } = story;
  return (
    <span className={`text-muted ${className}`}>
      {author &&
        (authorHref ? (
          <>
            <Link href={authorHref} className="font-semibold text-ink-2">
              {author}
            </Link>
            {" · "}
          </>
        ) : (
          `${author} · `
        ))}
      {timeLabel}
    </span>
  );
}
