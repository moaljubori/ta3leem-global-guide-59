
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarItem } from "./types";

interface SidebarMenuItemProps {
  item: SidebarItem;
  collapsed: boolean;
}

export const SidebarMenuItem = ({ item, collapsed }: SidebarMenuItemProps) => {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          "flex items-center py-2 px-3 rounded-md transition-colors",
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-100",
          collapsed && "justify-center px-0"
        )
      }
    >
      {collapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <item.icon className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      ) : (
        <>
          <item.icon className="ml-2 h-5 w-5" />
          <span>{item.title}</span>
        </>
      )}
    </NavLink>
  );
};
