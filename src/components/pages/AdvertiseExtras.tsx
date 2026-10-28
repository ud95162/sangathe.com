import { adPlacements, type AdPlacementId } from "@/lib/ads";
import { ta } from "@/lib/i18n/ta";

/** The reserved ad positions, drawn to scale so the client sees what each format looks like. */
export function AdFormats() {
  const entries = Object.entries(adPlacements) as [AdPlacementId, (typeof adPlacements)[AdPlacementId]][];
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5">
      {entries.map(([id, p]) => (
        <li key={id} className="flex flex-col gap-4 rounded-[0_20px_0_20px] bg-tint p-5 shadow-[0_10px_30px_rgba(31,41,55,0.06)]">
          <div className="flex min-h-[150px] items-center justify-center bg-page p-4">
            <div
              aria-hidden="true"
              className="flex w-full items-center justify-center border border-dashed border-line-strong bg-wash font-poppins text-xs font-semibold text-subtle"
              style={{ aspectRatio: `${p.width} / ${p.height}`, maxWidth: Math.min(p.width, 200), maxHeight: 150 }}
            >
              {p.width}×{p.height}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-base font-bold">{ta.advertisePage.placements[id]}</span>
            <span className="text-xs text-muted">
              {ta.advertisePage.size}: {p.width} × {p.height}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
