
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageCard } from "./components/PageCard";
import { PageCreationDialog } from "./components/PageCreationDialog";
import { usePages } from "./hooks/usePages";

export const AdminPages = () => {
  const { pages, createPage, togglePageStatus } = usePages();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPageData, setNewPageData] = useState({
    name: "",
    path: "",
    description: ""
  });

  const handleCreatePage = () => {
    createPage(newPageData);
    setIsCreateDialogOpen(false);
    setNewPageData({ name: "", path: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">إدارة صفحات الموقع</h2>
          <p className="text-gray-500 mt-2">قم بإدارة وتحرير جميع صفحات الموقع</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إنشاء صفحة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <PageCard
            key={page.id}
            page={page}
            onToggleStatus={togglePageStatus}
          />
        ))}
      </div>

      <PageCreationDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        pageData={newPageData}
        onPageDataChange={setNewPageData}
        onCreatePage={handleCreatePage}
      />
    </div>
  );
};
