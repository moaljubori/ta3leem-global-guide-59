
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Eye, EyeOff, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { SectionTypeSelector } from "./SectionTypeSelector";
import { Page, PageSection, SectionType } from "./types";

interface PageEditorSidebarProps {
  page: Page;
  activeSection: PageSection | null;
  onAddSection: (title: string, type: SectionType) => void;
  onDeleteSection: () => void;
  onToggleSectionStatus: () => void;
  onUpdateSectionTitle: (title: string) => void;
  onReorderSections: (sectionIds: string[]) => void;
  isMetadataOpen: boolean;
  isSectionsOpen: boolean;
}

export const PageEditorSidebar = ({
  page,
  activeSection,
  onAddSection,
  onDeleteSection,
  onToggleSectionStatus,
  onUpdateSectionTitle,
  onReorderSections,
  isMetadataOpen,
  isSectionsOpen,
}: PageEditorSidebarProps) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedSectionType, setSelectedSectionType] = useState<SectionType>(SectionType.Text);
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleAddSection = () => {
    if (newSectionTitle.trim() === "") return;
    
    onAddSection(newSectionTitle, selectedSectionType);
    setNewSectionTitle("");
    setIsAddingSection(false);
  };

  const handleMoveSection = (sectionId: string, direction: "up" | "down") => {
    const sortedSections = [...page.sections].sort((a, b) => a.order - b.order);
    const currentIndex = sortedSections.findIndex(section => section.id === sectionId);
    
    if (direction === "up" && currentIndex > 0) {
      const newSections = [...sortedSections];
      [newSections[currentIndex], newSections[currentIndex - 1]] = [newSections[currentIndex - 1], newSections[currentIndex]];
      onReorderSections(newSections.map(section => section.id));
    } else if (direction === "down" && currentIndex < sortedSections.length - 1) {
      const newSections = [...sortedSections];
      [newSections[currentIndex], newSections[currentIndex + 1]] = [newSections[currentIndex + 1], newSections[currentIndex]];
      onReorderSections(newSections.map(section => section.id));
    }
  };

  if (!isSectionsOpen && !isMetadataOpen) {
    return null;
  }

  return (
    <div className="w-64 flex-shrink-0 border rounded-md overflow-hidden">
      <div className="bg-gray-50 border-b p-3">
        <h3 className="font-medium">
          {isMetadataOpen ? "معلومات الصفحة" : "أقسام الصفحة"}
        </h3>
      </div>
      
      <ScrollArea className="h-[calc(100%-48px)] p-3">
        {isMetadataOpen && (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-gray-500">عنوان الصفحة</Label>
              <div className="font-medium">{page.title}</div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500">مسار الصفحة</Label>
              <div className="font-medium">{page.slug}</div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500">الحالة</Label>
              <div className="font-medium">
                {page.isActive ? (
                  <span className="text-green-600">نشط</span>
                ) : (
                  <span className="text-red-600">غير نشط</span>
                )}
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500">في القائمة الرئيسية</Label>
              <div className="font-medium">
                {page.isInMainNav ? (
                  <span className="text-green-600">نعم - {page.navLabel}</span>
                ) : (
                  <span className="text-gray-600">لا</span>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-xs text-gray-500">عنوان SEO</Label>
              <div className="text-sm break-words">{page.meta.title}</div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500">وصف SEO</Label>
              <div className="text-sm break-words">{page.meta.description}</div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500">الكلمات المفتاحية</Label>
              <div className="text-sm break-words">{page.meta.keywords}</div>
            </div>
          </div>
        )}

        {isSectionsOpen && (
          <div className="space-y-4">
            <div className="space-y-3">
              {page.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <div 
                    key={section.id} 
                    className={`flex flex-col border rounded-md overflow-hidden ${
                      activeSection?.id === section.id ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <div className="bg-gray-50 p-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <GripVertical className="h-4 w-4 text-gray-400 ml-2" />
                        <div className="flex-1 text-sm font-medium truncate">
                          {activeSection?.id === section.id ? (
                            <Input
                              value={activeSection.title}
                              onChange={(e) => onUpdateSectionTitle(e.target.value)}
                              size={15}
                              className="h-6 px-1"
                            />
                          ) : (
                            <span className={section.isActive ? "" : "text-gray-400"}>
                              {section.title}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMoveSection(section.id, "up")}
                          disabled={page.sections.sort((a, b) => a.order - b.order)[0].id === section.id}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMoveSection(section.id, "down")}
                          disabled={page.sections.sort((a, b) => a.order - b.order)[page.sections.length - 1].id === section.id}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Link
                      to={`/admin/site-pages/${page.id}/${section.id}`}
                      className={`p-2 text-xs ${
                        activeSection?.id === section.id ? "bg-blue-50" : ""
                      } ${!section.isActive ? "text-gray-400" : ""}`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{section.type}</span>
                        {section.isActive ? (
                          <Eye className="h-3 w-3 text-green-500" />
                        ) : (
                          <EyeOff className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>

            {activeSection && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleSectionStatus}
                    className="flex-1"
                  >
                    {activeSection.isActive ? (
                      <>
                        <EyeOff className="ml-2 h-4 w-4" />
                        إخفاء
                      </>
                    ) : (
                      <>
                        <Eye className="ml-2 h-4 w-4" />
                        إظهار
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onDeleteSection}
                    className="flex-1"
                    disabled={page.sections.length <= 1}
                  >
                    <Trash2 className="ml-2 h-4 w-4" />
                    حذف
                  </Button>
                </div>
                
                {page.sections.length <= 1 && (
                  <p className="text-xs text-red-500">لا يمكن حذف القسم الوحيد في الصفحة</p>
                )}
              </div>
            )}
            
            <Separator />
            
            {isAddingSection ? (
              <div className="space-y-3 p-2 border rounded-md">
                <div>
                  <Label htmlFor="sectionTitle" className="text-xs">عنوان القسم</Label>
                  <Input
                    id="sectionTitle"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="عنوان القسم الجديد"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="sectionType" className="text-xs">نوع القسم</Label>
                  <SectionTypeSelector 
                    value={selectedSectionType} 
                    onValueChange={setSelectedSectionType} 
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingSection(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={handleAddSection}
                    className="flex-1"
                    disabled={!newSectionTitle.trim()}
                  >
                    إضافة
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingSection(true)}
              >
                <Plus className="ml-2 h-4 w-4" />
                إضافة قسم جديد
              </Button>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
