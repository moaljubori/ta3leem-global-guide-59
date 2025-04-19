
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageEditorHeader } from "@/components/admin/site-pages/PageEditorHeader";
import { PageEditorSidebar } from "@/components/admin/site-pages/PageEditorSidebar";
import { PageEditorWorkspace } from "@/components/admin/site-pages/PageEditorWorkspace";
import { usePageBuilder } from "@/components/admin/site-pages/hooks/usePageBuilder";
import { SectionType } from "@/components/admin/site-pages/types";

const PageBuilderEditor = () => {
  const { pageId, sectionId } = useParams<{ pageId?: string; sectionId?: string }>();
  const navigate = useNavigate();
  
  const { 
    pages,
    setActivePage,
    setActiveSection,
    activePage,
    activeSection,
    updatePage,
    updateSection,
    addSection,
    deleteSection,
    toggleSectionStatus,
    reorderSections
  } = usePageBuilder();

  const [sectionContent, setSectionContent] = useState<string>("");
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(true);

  // Set active page and section when the component mounts or params change
  useEffect(() => {
    if (pageId) {
      setActivePage(pageId);
      
      if (sectionId) {
        setActiveSection(sectionId);
      } else {
        // If no section is selected, navigate to the first section if available
        const page = pages.find(p => p.id === pageId);
        if (page && page.sections.length > 0) {
          const firstSection = [...page.sections].sort((a, b) => a.order - b.order)[0];
          navigate(`/admin/site-pages/${pageId}/${firstSection.id}`);
        }
      }
    }
  }, [pageId, sectionId, pages, setActivePage, setActiveSection, navigate]);

  // Update section content when active section changes
  useEffect(() => {
    if (activeSection) {
      setSectionContent(activeSection.content);
    }
  }, [activeSection]);

  const handleContentChange = (content: string) => {
    setSectionContent(content);
  };

  const handleSaveContent = () => {
    if (pageId && sectionId && activeSection) {
      updateSection(pageId, sectionId, {
        ...activeSection,
        content: sectionContent,
      });
    }
  };

  const handleUpdateSectionTitle = (title: string) => {
    if (pageId && sectionId && activeSection) {
      updateSection(pageId, sectionId, {
        ...activeSection,
        title,
      });
    }
  };

  const handleAddSection = (sectionTitle: string, sectionType: SectionType) => {
    if (pageId) {
      const newSection = addSection(pageId, {
        title: sectionTitle,
        type: sectionType,
      });
      
      if (newSection) {
        navigate(`/admin/site-pages/${pageId}/${newSection.id}`);
      }
    }
  };

  const handleDeleteSection = () => {
    if (pageId && sectionId) {
      deleteSection(pageId, sectionId);
      
      // Navigate to the first section after deletion
      const page = pages.find(p => p.id === pageId);
      if (page && page.sections.length > 1) {
        const remainingSections = page.sections.filter(s => s.id !== sectionId);
        const firstSection = [...remainingSections].sort((a, b) => a.order - b.order)[0];
        navigate(`/admin/site-pages/${pageId}/${firstSection.id}`);
      } else {
        navigate(`/admin/site-pages/${pageId}`);
      }
    }
  };

  const handleToggleSectionStatus = () => {
    if (pageId && sectionId) {
      toggleSectionStatus(pageId, sectionId);
    }
  };

  const handleUpdatePageSettings = (settings: any) => {
    if (pageId && activePage) {
      updatePage(pageId, {
        ...activePage,
        ...settings,
      });
    }
  };

  if (!activePage) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold">الصفحة غير موجودة</h2>
          <p className="mt-2">الصفحة المطلوبة غير موجودة أو تم حذفها.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col h-full">
        <PageEditorHeader 
          page={activePage}
          section={activeSection}
          onSave={handleSaveContent}
          onUpdatePageSettings={handleUpdatePageSettings}
          onToggleMetadata={() => setIsMetadataOpen(!isMetadataOpen)}
          onToggleSections={() => setIsSectionsOpen(!isSectionsOpen)}
        />
        
        <div className="flex flex-1 mt-4 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
          <PageEditorSidebar 
            page={activePage}
            activeSection={activeSection}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
            onToggleSectionStatus={handleToggleSectionStatus}
            onUpdateSectionTitle={handleUpdateSectionTitle}
            onReorderSections={sectionIds => pageId && reorderSections(pageId, sectionIds)}
            isMetadataOpen={isMetadataOpen}
            isSectionsOpen={isSectionsOpen}
          />
          
          <PageEditorWorkspace
            section={activeSection}
            content={sectionContent}
            onContentChange={handleContentChange}
            onSave={handleSaveContent}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default PageBuilderEditor;
