
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarItem } from "./types";

interface SidebarSubmenuProps {
  item: SidebarItem;
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarSubmenu = ({ item, collapsed, isOpen, onToggle }: SidebarSubmenuProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50",
          collapsed && "justify-center px-0"
        )}
        onClick={onToggle}
      >
        {collapsed ? (
          <item.icon className="h-5 w-5" />
        ) : (
          <>
            <item.icon className="ml-2 h-5 w-5" />
            <span>{item.title}</span>
            <div className="mr-auto">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </>
        )}
      </Button>

      {!collapsed && isOpen && (
        <div className="mr-6 border-r border-gray-200 pr-2 mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavLink
              key={child.href}
              to={child.href}
              className={({ isActive }) =>
                cn(
                  "block py-2 px-3 rounded-md transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                )
              }
            >
              {child.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
