import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, Home, Phone, Lock, FileQuestion, Briefcase, Plus,
  Settings, ExternalLink, Eye, PenTool, Trash2, Toggle
} from "lucide-react";
import { Link } from "react-router-dom";

type PageSection = {
  id: string;
  name: string;
  description: string;
  contactInfo?: {
    whatsapp: string;
    email: string;
    phone: string;
  };
};

type PageInfo = {
  id: string;
  name: string;
  path: string;
  icon: any;
  description: string;
  isActive: boolean;
  sections: PageSection[];
};

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
          <Card key={page.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <page.icon className="h-5 w-5 text-gray-500 ml-2" />
                  <CardTitle>{page.name}</CardTitle>
                </div>
                <Button
                  variant={page.isActive ? "default" : "secondary"}
                  size="sm"
                  onClick={() => togglePageStatus(page.id)}
                >
                  {page.isActive ? "نشط" : "معطل"}
                </Button>
              </div>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Link to={`/admin/pages/${page.id}`}>
                    <Button variant="outline" size="sm">
                      <PenTool className="ml-2 h-4 w-4" />
                      تحرير الصفحة
                    </Button>
                  </Link>
                  <Link to={page.path} target="_blank">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="ml-2 h-4 w-4" />
                      معاينة
                    </Button>
                  </Link>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">أقسام الصفحة:</h4>
                  <ul className="space-y-2">
                    {page.sections.map((section) => (
                      <li key={section.id} className="text-sm">
                        <Link
                          to={`/admin/pages/${page.id}/${section.id}`}
                          className="block p-2 rounded hover:bg-gray-100"
                        >
                          {section.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إنشاء صفحة جديدة</DialogTitle>
            <DialogDescription>
              قم بإدخال معلومات الصفحة الجديدة
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="page-name">اسم الصفحة</Label>
              <Input
                id="page-name"
                value={newPageData.name}
                onChange={(e) => setNewPageData({ ...newPageData, name: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="page-path">مسار الصفحة (URL)</Label>
              <Input
                id="page-path"
                value={newPageData.path}
                onChange={(e) => setNewPageData({ ...newPageData, path: e.target.value })}
                placeholder="/example-page"
              />
            </div>
            
            <div>
              <Label htmlFor="page-description">وصف الصفحة</Label>
              <Input
                id="page-description"
                value={newPageData.description}
                onChange={(e) => setNewPageData({ ...newPageData, description: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreatePage}>إنشاء الصفحة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
