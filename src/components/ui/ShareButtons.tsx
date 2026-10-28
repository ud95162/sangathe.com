import { SocialIcon } from "@/components/ui/SocialIcon";
import { ta } from "@/lib/i18n/ta";
import { shareLinks } from "@/lib/share";

const networks = [
  { id: "facebook", label: "Facebook", bg: "bg-facebook" },
  { id: "x", label: "X", bg: "bg-black" },
  { id: "whatsapp", label: "WhatsApp", bg: "bg-whatsapp" },
  { id: "telegram", label: "Telegram", bg: "bg-telegram" },
] as const;

export function ShareButtons({ url, title, className = "" }: { url: string; title: string; className?: string }) {
  const links = shareLinks(url, title);
  return (
    <span className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {ta.share.label}
      {networks.map((n) => (
        <a
          key={n.id}
          href={links[n.id]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ta.share.on(n.label)}
          className={`flex size-10 items-center justify-center rounded-full ${n.bg}`}
        >
          <SocialIcon id={n.id} variant="white" context="share" />
        </a>
      ))}
    </span>
  );
}
