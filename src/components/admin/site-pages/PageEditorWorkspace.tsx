
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageSection } from "./types";
import { PageContentEditor } from "./PageContentEditor";
import { PagePreview } from "./PagePreview";

interface PageEditorWorkspaceProps {
  section: PageSection | null;
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
}

export const PageEditorWorkspace = ({
  section,
  content,
  onContentChange,
  onSave,
}: PageEditorWorkspaceProps) => {
  if (!section) {
    return (
      <div className="flex-1 border rounded-md flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">لم يتم اختيار قسم</h3>
          <p className="text-sm text-gray-500">
            يرجى اختيار قسم من القائمة الجانبية للبدء في التحرير
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 border rounded-md overflow-hidden">
      <Tabs defaultValue="editor" className="h-full flex flex-col">
        <div className="bg-gray-50 border-b px-4">
          <TabsList className="h-11">
            <TabsTrigger value="editor">المحرر</TabsTrigger>
            <TabsTrigger value="preview">معاينة</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="editor" className="flex-1 p-0 m-0">
          <PageContentEditor 
            content={content}
            onContentChange={onContentChange}
            onSave={onSave}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 p-0 m-0">
          <PagePreview 
            content={content}
            sectionType={section.type}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
