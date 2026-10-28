import { Petal } from "@/components/ui/Petal";
import { ta } from "@/lib/i18n/ta";

interface TickerItem {
  id: string;
  href: string;
  title: string;
}

function Items({ items, hidden = false }: { items: TickerItem[]; hidden?: boolean }) {
  return items.map((item) => (
    <a
      key={`${hidden ? "dup-" : ""}${item.id}`}
      href={item.href}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="flex items-center gap-3 whitespace-nowrap text-[15px] font-medium text-white hover:text-white"
    >
      <Petal className="size-2 bg-golden" />
      {item.title}
    </a>
  ));
}

export function BreakingTicker({ items }: { items: TickerItem[] }) {
  return (
    <div className="flex items-center overflow-hidden rounded bg-charcoal text-mist">
      <span className="flex shrink-0 items-center self-stretch bg-flame px-5 py-3 text-[15px] font-bold text-white">
        {ta.ticker.label}
      </span>
      <div className="min-w-0 flex-1 overflow-hidden py-3">
        <div className="flex w-max animate-ticker gap-14 pl-6 hover:[animation-play-state:paused]">
          <Items items={items} />
          <Items items={items} hidden />
        </div>
      </div>
    </div>
  );
}
