
import { useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { usePageContent } from "@/components/admin/pages/hooks/usePageContent";
import { PageEditorHeader } from "@/components/admin/pages/components/PageEditorHeader";
import { EditorTabs } from "@/components/admin/pages/components/EditorTabs";

const PageEditor = () => {
  const { pageId, sectionId } = useParams();
  const {
    content,
    setContent,
    whatsappNumber,
    setWhatsappNumber,
    whatsappMessage,
    setWhatsappMessage,
    handleSave,
  } = usePageContent(pageId, sectionId);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageEditorHeader 
          pageId={pageId} 
          sectionId={sectionId} 
          onSave={handleSave}
        />
        
        <EditorTabs
          content={content}
          onContentChange={setContent}
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
          onWhatsappNumberChange={setWhatsappNumber}
          onWhatsappMessageChange={setWhatsappMessage}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
