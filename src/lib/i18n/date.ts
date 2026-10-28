const weekdays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
export const months = [
  "ஜனவரி", "பெப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்",
  "ஜூலை", "ஆகஸ்ட்", "செப்டெம்பர்", "ஒக்டோபர்", "நவம்பர்", "டிசம்பர்",
];

/** "திங்கள், 26 ஒக்டோபர் 2026", in Sri Lanka time. */
export function formatMastheadDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  const weekday = weekdays[["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"))];
  return `${weekday}, ${get("day")} ${months[Number(get("month")) - 1]} ${get("year")}`;
}
