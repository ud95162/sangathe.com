/** Reserved ad placements. The advertising system itself is not part of Phase 1. */
export const adPlacements = {
  "home-top": { label: "Leaderboard", width: 970, height: 90 },
  "home-middle": { label: "Leaderboard", width: 970, height: 90 },
  "article-inline": { label: "Rectangle", width: 336, height: 280 },
  "sidebar": { label: "Half page", width: 300, height: 600 },
} as const;

export type AdPlacementId = keyof typeof adPlacements;

/**
 * Slots render nothing unless this is "true". Set NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true to
 * preview where ads will sit (for example in a client walkthrough).
 */
export const showAdPlaceholders = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";
