import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Images,
  FileText,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Overview", path: "/dashboard/overview", icon: LayoutDashboard },
  { title: "Projects", path: "/dashboard/projects", icon: FolderKanban },
  { title: "Hero Image", path: "/dashboard/hero", icon: Image },
  { title: "About Images", path: "/dashboard/about", icon: Images },
  { title: "Resume / CV", path: "/dashboard/cv", icon: FileText },
];

export const findNavItem = (path: string): NavItem | undefined =>
  NAV_ITEMS.find((item) => item.path === path);

export const findParentOf = (path: string): NavItem | undefined =>
  NAV_ITEMS.find((item) => item.path === path);
