import { adPlacements, showAdPlaceholders, type AdPlacementId } from "@/lib/ads";

/**
 * Where an ad will go. Invisible until ads are switched on, so the approved design stays clean.
 * When an ad network is connected, render its tag inside the fixed-size box to avoid layout shift.
 */
export function AdSlot({ id, className = "" }: { id: AdPlacementId; className?: string }) {
  if (!showAdPlaceholders) return null;
  const { label, width, height } = adPlacements[id];
  return (
    <div
      aria-hidden="true"
      data-ad-slot={id}
      className={`mx-auto flex w-full max-w-full items-center justify-center border border-dashed border-line-strong bg-wash text-xs text-subtle ${className}`}
      style={{ maxWidth: width, minHeight: height }}
    >
      Advertisement · {label} {width}×{height}
    </div>
  );
}
