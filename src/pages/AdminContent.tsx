
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

// Content sections mapping
const contentSections = {
  "text": {
    title: "إدارة النصوص",
    description: "قم بتعديل نصوص الموقع من هنا",
    subsections: [
      { id: "hero", title: "القسم الرئيسي" },
      { id: "about", title: "من نحن" },
      { id: "services", title: "خدماتنا" },
      { id: "testimonials", title: "آراء العملاء" },
      { id: "contact", title: "تواصل معنا" },
      { id: "blog", title: "المدونة" },
      { id: "countries", title: "الدول" },
      { id: "privacy", title: "سياسة الخصوصية" },
      { id: "terms", title: "الشروط والأحكام" }
    ]
  },
  "buttons": {
    title: "الأزرار والروابط",
    description: "قم بتعديل أزرار وروابط الموقع من هنا",
    subsections: [
      { id: "navigation", title: "روابط التنقل" },
      { id: "cta", title: "أزرار الدعوة للعمل" },
      { id: "social", title: "روابط التواصل الاجتماعي" }
    ]
  },
  "icons": {
    title: "الأيقونات",
    description: "قم بتعديل أيقونات الموقع من هنا",
    subsections: [
      { id: "features", title: "أيقونات الميزات" },
      { id: "services", title: "أيقونات الخدمات" },
      { id: "social", title: "أيقونات التواصل الاجتماعي" }
    ]
  },
  "colors": {
    title: "ألوان الموقع",
    description: "قم بتعديل ألوان الموقع من هنا",
    subsections: [
      { id: "primary", title: "الألوان الرئيسية" },
      { id: "secondary", title: "الألوان الثانوية" },
      { id: "accent", title: "ألوان التمييز" }
    ]
  }
};

const ContentSection = ({ section }: { section: string }) => {
  const sectionData = contentSections[section as keyof typeof contentSections];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{sectionData.title}</CardTitle>
        <CardDescription>{sectionData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sectionData.subsections.map((subsection) => (
            <Card key={subsection.id} className="p-4">
              <h3 className="text-lg font-semibold mb-2">{subsection.title}</h3>
              <p className="text-sm text-gray-500">انقر للتعديل</p>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AdminContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname === "/admin/content") return "text";
    const path = location.pathname.split("/");
    return path[path.length - 1];
  };

  const handleTabChange = (value: string) => {
    navigate(`/admin/content/${value}`);
  };
  
  useEffect(() => {
    if (location.pathname === "/admin/content") {
      navigate("/admin/content/text", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إدارة المحتوى</h2>
        
        <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="text">النصوص</TabsTrigger>
            <TabsTrigger value="buttons">الأزرار والروابط</TabsTrigger>
            <TabsTrigger value="icons">الأيقونات</TabsTrigger>
            <TabsTrigger value="colors">الألوان</TabsTrigger>
          </TabsList>
          
          {Object.keys(contentSections).map((section) => (
            <TabsContent key={section} value={section}>
              <ContentSection section={section} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
