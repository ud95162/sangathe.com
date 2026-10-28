export function Petal({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rotate-45 rounded-[0_100%_0_100%] ${className}`}
    />
  );
}
