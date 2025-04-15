import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FileText, Home, Lock, FileQuestion, Briefcase, Plus } from "lucide-react";
import { PageCard } from "./components/PageCard";
import { PageCreationDialog } from "./components/PageCreationDialog";
import { PageInfo } from "./types";

export const AdminPages = () => {
  const [pages, setPages] = useState<PageInfo[]>([
    {
      id: "home",
      name: "الصفحة الرئيسية",
      path: "/",
      icon: Home,
      description: "الصفحة الرئيسية للموقع",
      isActive: true,
      sections: [
        {
          id: "hero",
          name: "قسم الترحيب",
          description: "القسم الرئيسي في أعلى الصفحة",
          contactInfo: {
            whatsapp: "+966500000000",
            email: "info@example.com",
            phone: "+966500000000"
          }
        },
      ]
    },
    {
      id: "services",
      name: "خدماتنا",
      path: "/services",
      icon: Briefcase,
      description: "صفحة الخدمات والحلول",
      isActive: true,
      sections: [
        {
          id: "services-intro",
          name: "مقدمة الخدمات",
          description: "نظرة عامة على خدماتنا",
          contactInfo: {
            whatsapp: "+966500000000",
            email: "services@example.com",
            phone: "+966500000000"
          }
        }
      ]
    },
    {
      id: "privacy",
      name: "سياسة الخصوصية",
      path: "/privacy",
      icon: Lock,
      description: "سياسة الخصوصية وحماية البيانات",
      isActive: true,
      sections: [
        {
          id: "privacy-content",
          name: "محتوى السياسة",
          description: "تفاصيل سياسة الخصوصية"
        }
      ]
    },
    {
      id: "terms",
      name: "الشروط والأحكام",
      path: "/terms",
      icon: FileQuestion,
      description: "الشروط والأحكام العامة",
      isActive: true,
      sections: [
        {
          id: "terms-content",
          name: "محتوى الشروط",
          description: "تفاصيل الشروط والأحكام"
        }
      ]
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPageData, setNewPageData] = useState({
    name: "",
    path: "",
    description: ""
  });

  const { toast } = useToast();

  const handleCreatePage = () => {
    const newPage: PageInfo = {
      id: Date.now().toString(),
      name: newPageData.name,
      path: newPageData.path,
      icon: FileText,
      description: newPageData.description,
      isActive: true,
      sections: [
        {
          id: "main-content",
          name: "المحتوى الرئيسي",
          description: "المحتوى الأساسي للصفحة",
          contactInfo: {
            whatsapp: "+966500000000",
            email: "contact@example.com",
            phone: "+966500000000"
          }
        }
      ]
    };

    setPages([...pages, newPage]);
    setIsCreateDialogOpen(false);
    setNewPageData({ name: "", path: "", description: "" });
    toast({
      title: "تم إنشاء الصفحة",
      description: `تم إنشاء صفحة ${newPage.name} بنجاح`
    });
  };

  const togglePageStatus = (pageId: string) => {
    setPages(pages.map(page => 
      page.id === pageId 
        ? { ...page, isActive: !page.isActive }
        : page
    ));
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
