export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "section" | "header" | "main";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 ${className}`}>{children}</Tag>;
}
