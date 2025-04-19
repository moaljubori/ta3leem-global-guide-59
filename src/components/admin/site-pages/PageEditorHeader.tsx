
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Settings, Layers, FileSymlink } from "lucide-react";
import { Page, PageSection } from "./types";
import { PageSettingsDialog } from "./PageSettingsDialog";
import { useState } from "react";

interface PageEditorHeaderProps {
  page: Page;
  section: PageSection | null;
  onSave: () => void;
  onUpdatePageSettings: (settings: Partial<Page>) => void;
  onToggleMetadata: () => void;
  onToggleSections: () => void;
}

export const PageEditorHeader = ({ 
  page, 
  section,
  onSave,
  onUpdatePageSettings,
  onToggleMetadata,
  onToggleSections
}: PageEditorHeaderProps) => {
  const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <Link 
          to="/admin/site-pages" 
          className="inline-flex items-center text-blue-600 mb-2"
        >
          <ArrowLeft className="ml-1 h-4 w-4" />
          العودة إلى صفحات الموقع
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {page.title}
          {section && <span className="text-gray-500"> / {section.title}</span>}
        </h2>
        <p className="text-gray-500 mt-1">{page.description}</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onToggleMetadata}>
          <Settings className="ml-2 h-4 w-4" />
          إعدادات الصفحة
        </Button>
        
        <Button variant="outline" onClick={onToggleSections}>
          <Layers className="ml-2 h-4 w-4" />
          أقسام الصفحة
        </Button>
        
        <Button variant="outline" asChild>
          <Link to={page.slug} target="_blank">
            <FileSymlink className="ml-2 h-4 w-4" />
            معاينة الصفحة
          </Link>
        </Button>
        
        <Button onClick={onSave}>
          <Save className="ml-2 h-4 w-4" />
          حفظ التغييرات
        </Button>
      </div>

      <PageSettingsDialog
        isOpen={isPageSettingsOpen}
        onClose={() => setIsPageSettingsOpen(false)}
        page={page}
        onUpdatePage={onUpdatePageSettings}
      />
    </div>
  );
};
