
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  FileText,
  PenTool,
  Image,
  BarChart2,
  Bell,
  Code,
  Newspaper,
  Mail,
  Globe,
  MenuIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  children?: { title: string; href: string }[];
};

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: "لوحة التحكم",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      title: "صفحات الموقع",
      icon: FileText,
      href: "/admin/pages",
      children: [
        { title: "الرئيسية", href: "/admin/pages/home" },
        { title: "من نحن", href: "/admin/pages/about" },
        { title: "تواصل معنا", href: "/admin/pages/contact" },
        { title: "الدول", href: "/admin/pages/countries" },
        { title: "المدونة", href: "/admin/pages/blog" },
      ],
    },
    {
      title: "المحتوى",
      icon: PenTool,
      href: "/admin/content",
      children: [
        { title: "النصوص", href: "/admin/content/text" },
        { title: "الأزرار والروابط", href: "/admin/content/buttons" },
        { title: "الأيقونات", href: "/admin/content/icons" },
        { title: "ألوان الموقع", href: "/admin/content/colors" },
      ],
    },
    {
      title: "الوسائط",
      icon: Image,
      href: "/admin/media",
    },
    {
      title: "المدونة",
      icon: Newspaper,
      href: "/admin/blog",
    },
    {
      title: "الاستشارات",
      icon: MessageSquare,
      href: "/admin/consultations",
    },
    {
      title: "الإحصائيات",
      icon: BarChart2,
      href: "/admin/statistics",
    },
    {
      title: "المستخدمين",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "الإشعارات",
      icon: Bell,
      href: "/admin/notifications",
    },
    {
      title: "تحسين محركات البحث",
      icon: Globe,
      href: "/admin/seo",
    },
    {
      title: "تحسين البريد الإلكتروني",
      icon: Mail,
      href: "/admin/email",
    },
    {
      title: "أكواد إضافية",
      icon: Code,
      href: "/admin/custom-code",
    },
    {
      title: "الإعدادات",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

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
        {sidebarItems.map((item) => (
          <div key={item.href} className="my-1">
            {item.children ? (
              <div>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50",
                    collapsed && "justify-center px-0"
                  )}
                  onClick={() => toggleSubmenu(item.title)}
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
                      <div className="mr-auto">
                        {openSubmenus[item.title] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </>
                  )}
                </Button>

                {!collapsed && openSubmenus[item.title] && (
                  <div className="mr-6 border-r border-gray-200 pr-2 mt-1 space-y-1">
                    {item.children.map((child) => (
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
            ) : (
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
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
