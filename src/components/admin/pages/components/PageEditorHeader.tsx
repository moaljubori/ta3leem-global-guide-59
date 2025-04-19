
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { getSectionTitle, getSectionDescription } from "../utils/sectionUtils";

interface PageEditorHeaderProps {
  pageId?: string;
  sectionId?: string;
  onSave: () => void;
}

export const PageEditorHeader = ({ pageId, sectionId, onSave }: PageEditorHeaderProps) => {
  const getPageTitle = () => {
    switch (pageId) {
      case "home": return "الصفحة الرئيسية";
      case "about": return "من نحن";
      case "contact": return "تواصل معنا";
      case "countries": return "الدول";
      case "blog": return "المدونة";
      case "services": return "خدماتنا";
      case "privacy": return "سياسة الخصوصية";
      case "terms": return "الشروط والأحكام";
      default: return "تحرير الصفحة";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Link 
          to="/admin/pages" 
          className="inline-flex items-center text-blue-600 mb-2"
        >
          <ArrowLeft className="ml-1 h-4 w-4" />
          العودة إلى صفحات الموقع
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {getPageTitle()} - {getSectionTitle(sectionId)}
        </h2>
        <p className="text-gray-500 mt-1">{getSectionDescription(sectionId)}</p>
      </div>
      <Button onClick={onSave}>
        <Save className="ml-2 h-4 w-4" />
        حفظ التغييرات
      </Button>
    </div>
  );
};
