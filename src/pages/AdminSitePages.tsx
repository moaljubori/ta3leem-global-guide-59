
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SitePagesList } from "@/components/admin/site-pages/SitePagesList";
import { PageCreationDialog } from "@/components/admin/site-pages/PageCreationDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePageBuilder } from "@/components/admin/site-pages/hooks/usePageBuilder";
import { Page } from "@/components/admin/site-pages/types";

const AdminSitePages = () => {
  const { pages, createPage, togglePageStatus, deletePage } = usePageBuilder();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPageData, setNewPageData] = useState<Partial<Page>>({
    title: "",
    slug: "",
    description: "",
  });

  const handleCreatePage = () => {
    createPage(newPageData);
    setIsCreateDialogOpen(false);
    setNewPageData({
      title: "",
      slug: "",
      description: "",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">إدارة صفحات الموقع</h2>
            <p className="text-gray-500 mt-2">قم بإنشاء وتحرير صفحات الموقع</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إنشاء صفحة جديدة
          </Button>
        </div>

        <SitePagesList 
          pages={pages} 
          onToggleStatus={togglePageStatus}
          onDeletePage={deletePage}
        />

        <PageCreationDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          pageData={newPageData}
          onPageDataChange={setNewPageData}
          onCreatePage={handleCreatePage}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminSitePages;
