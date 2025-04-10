
import { useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

const PageEditor = () => {
  const { pageId, sectionId } = useParams();
  const [content, setContent] = useState("// محتوى القسم المحدد\nيمكنك تعديل هذا المحتوى هنا.");
  const { toast } = useToast();

  const getPageTitle = () => {
    switch (pageId) {
      case "home": return "الصفحة الرئيسية";
      case "about": return "من نحن";
      case "contact": return "تواصل معنا";
      case "countries": return "الدول";
      case "blog": return "المدونة";
      default: return "تحرير الصفحة";
    }
  };

  const getSectionTitle = () => {
    if (!sectionId) return "تحرير الصفحة";
    
    // Map section IDs to readable titles
    const sectionTitles: Record<string, string> = {
      // Home page sections
      "hero": "قسم الترحيب",
      "processes": "خطوات العمل",
      "countries": "الدول المتاحة",
      "testimonials": "آراء العملاء",
      "blog_previews": "مقالات المدونة",
      "cta": "دعوة للتواصل",
      
      // About page sections
      "about_hero": "مقدمة من نحن",
      "our_mission": "رسالتنا ورؤيتنا",
      "our_team": "فريق العمل",
      
      // Contact page sections
      "contact_hero": "مقدمة اتصل بنا",
      "contact_info": "معلومات الاتصال",
      "contact_form": "نموذج التواصل",
      "map": "الخريطة",

      // Countries page sections
      "countries_hero": "مقدمة الدول",
      "countries_list": "قائمة الدول",
      
      // Blog page sections
      "blog_hero": "مقدمة المدونة",
      "blog_categories": "تصنيفات المدونة",
      "blog_posts": "المقالات",
    };
    
    return sectionTitles[sectionId] || "قسم غير معروف";
  };

  const getSectionDescription = () => {
    if (!sectionId) return "تحرير كامل الصفحة";
    
    // Map section IDs to readable descriptions
    const sectionDescriptions: Record<string, string> = {
      // Home page sections
      "hero": "القسم الرئيسي في أعلى الصفحة مع الصورة والعنوان الرئيسي",
      "processes": "قسم يوضح خطوات عملية التقديم للدراسة في الخارج",
      "countries": "عرض الدول المتاحة للدراسة",
      "testimonials": "شهادات وآراء الطلاب السابقين",
      "blog_previews": "عرض لأحدث المقالات من المدونة",
      "cta": "قسم يحث الزائر على التواصل معنا",
      
      // About page sections
      "about_hero": "النص التعريفي الرئيسي",
      "our_mission": "قسم يوضح رسالة ورؤية الشركة",
      "our_team": "عرض أعضاء فريق العمل",
      
      // Contact page sections
      "contact_hero": "العنوان الرئيسي والنص التمهيدي",
      "contact_info": "الهاتف والبريد الإلكتروني والعنوان",
      "contact_form": "النموذج الذي يملأه الزوار للتواصل",
      "map": "خريطة الموقع",
      
      // Countries page sections
      "countries_hero": "العنوان الرئيسي والنص التمهيدي",
      "countries_list": "عرض الدول المتاحة للدراسة",
      
      // Blog page sections
      "blog_hero": "العنوان الرئيسي والنص التمهيدي",
      "blog_categories": "تصنيفات المقالات",
      "blog_posts": "قائمة المقالات",
    };
    
    return sectionDescriptions[sectionId] || "تحرير هذا القسم من الصفحة";
  };

  const handleSave = () => {
    // In a real app, you would save the content to a database or API
    toast({
      title: "تم حفظ التغييرات",
      description: `تم تحديث محتوى ${getSectionTitle()} بنجاح`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link 
              to="/admin/pages" 
              className="inline-flex items-center text-blue-600 mb-2"
            >
              <ArrowLeft className="ml-1 h-4 w-4" />
              العودة إلى صفحات الموقع
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">
              {getPageTitle()} - {getSectionTitle()}
            </h2>
            <p className="text-gray-500 mt-1">{getSectionDescription()}</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="ml-2 h-4 w-4" />
            حفظ التغييرات
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>محرر المحتوى</CardTitle>
            <CardDescription>قم بتحرير محتوى القسم المحدد</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[400px] font-mono" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
