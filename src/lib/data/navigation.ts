import { navItems } from "@/lib/mock/navigation";
import type { NavItem } from "@/lib/types";

export async function getNavigation(): Promise<NavItem[]> {
  return navItems;
}
