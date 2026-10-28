import Link from "next/link";
import { ta } from "@/lib/i18n/ta";

export function Breadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label={ta.article.breadcrumb} className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
      {items.map((item, i) => (
        <span key={`${item.name}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">›</span>}
          {item.href ? (
            <Link href={item.href} className="text-muted">
              {item.name}
            </Link>
          ) : (
            <span aria-current="page" className="font-semibold text-flame-text">
              {item.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
