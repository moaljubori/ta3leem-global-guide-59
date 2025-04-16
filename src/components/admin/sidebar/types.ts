
export type SidebarItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  children?: { title: string; href: string }[];
};
