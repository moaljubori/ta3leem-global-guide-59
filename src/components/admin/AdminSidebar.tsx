
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarSubmenu } from "./sidebar/SidebarSubmenu";
import { sidebarItems } from "./sidebar/sidebarItems";
import { SidebarItem } from "./sidebar/types";

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div
      className={cn(
        "bg-white border-l border-gray-200 h-screen overflow-y-auto transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="font-bold text-blue-600 text-xl">تعليم عالمي</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-2">
        {sidebarItems.map((item: SidebarItem) => (
          <div key={item.href} className="my-1">
            {item.children ? (
              <SidebarSubmenu
                item={item}
                collapsed={collapsed}
                isOpen={openSubmenus[item.title]}
                onToggle={() => toggleSubmenu(item.title)}
              />
            ) : (
              <SidebarMenuItem
                item={item}
                collapsed={collapsed}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
