import Image from "next/image";
import { iconSize, type SocialId } from "@/lib/site";

export function SocialIcon({
  id,
  variant,
  context,
}: {
  id: SocialId;
  variant: "dark" | "white";
  context: "header" | "footer" | "share";
}) {
  const size = iconSize[id][context];
  return (
    <Image
      src={`/icons/${variant}/${id}.png`}
      alt=""
      width={size}
      height={size}
      className={variant === "dark" ? "block dark:invert" : "block"}
      style={{ width: size, height: size }}
    />
  );
}
