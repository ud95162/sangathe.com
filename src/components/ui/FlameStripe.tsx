export function FlameStripe({ className = "h-1" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex ${className}`}>
      <span className="flex-[6] bg-flame" />
      <span className="flex-[3] bg-sunset" />
      <span className="flex-[2] bg-golden" />
      <span className="flex-[1] bg-leaf" />
    </div>
  );
}
