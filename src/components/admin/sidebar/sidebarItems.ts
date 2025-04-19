
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  FileText,
  BarChart2,
  Bell,
  Code,
  Newspaper,
  Mail,
  Globe,
  Circle,
} from "lucide-react";
import { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
  {
    title: "لوحة التحكم",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "إدارة صفحات الموقع",
    icon: FileText,
    href: "/admin/site-pages",
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
    title: "الإعلانات",
    icon: Circle,
    href: "/admin/advertisements",
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
