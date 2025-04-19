
export type Advertisement = {
  id: string;
  name: string;
  type: 'image' | 'code';
  content: string;
  location: string;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
};

export const pageLocations = [
  { value: "home-header", label: "الصفحة الرئيسية - أعلى" },
  { value: "home-sidebar", label: "الصفحة الرئيسية - الجانب" },
  { value: "blog-header", label: "المدونة - أعلى" },
  { value: "blog-sidebar", label: "المدونة - الجانب" },
  { value: "countries-sidebar", label: "صفحة الدول - الجانب" },
  { value: "all-footer", label: "جميع الصفحات - الأسفل" },
] as const;
