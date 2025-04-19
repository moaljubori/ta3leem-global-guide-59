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
  List,
} from "lucide-react";
import { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
  {
    title: "لوحة التحكم",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "إدارة المحتوى",
    icon: List,
    href: "/admin/content",
    children: [
      { title: "النصوص", href: "/admin/content/text" },
      { title: "الأزرار والروابط", href: "/admin/content/buttons" },
      { title: "الأيقونات", href: "/admin/content/icons" },
      { title: "الألوان", href: "/admin/content/colors" },
    ],
  },
  {
    title: "صفحات الموقع",
    icon: FileText,
    href: "/admin/pages",
    children: [
      { title: "الرئيسية", href: "/admin/pages/home" },
      { title: "من نحن", href: "/admin/pages/about" },
      { title: "الخدمات", href: "/admin/pages/services" },
      { title: "تواصل معنا", href: "/admin/pages/contact" },
      { title: "الدول", href: "/admin/pages/countries" },
      { title: "المدونة", href: "/admin/pages/blog" },
    ],
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
