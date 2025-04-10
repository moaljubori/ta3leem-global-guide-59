
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Home, FileText, Phone, Globe, NewspaperIcon, PenTool, Save,
  ExternalLink, AlertCircle, Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

type PageInfo = {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
  description: string;
  sections: {
    id: string;
    name: string;
    description: string;
    editPath: string;
  }[];
};

export const AdminPages = () => {
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  
  const { toast } = useToast();

  const pages: PageInfo[] = [
    {
      id: "home",
      name: "الصفحة الرئيسية",
      path: "/",
      icon: Home,
      description: "الصفحة الرئيسية للموقع وتعرض أهم المعلومات",
      sections: [
        {
          id: "hero",
          name: "قسم الترحيب",
          description: "القسم الرئيسي في أعلى الصفحة مع الصورة والعنوان الرئيسي",
          editPath: "/admin/pages/home/hero"
        },
        {
          id: "processes",
          name: "خطوات العمل",
          description: "قسم يوضح خطوات عملية التقديم للدراسة في الخارج",
          editPath: "/admin/pages/home/processes"
        },
        {
          id: "countries",
          name: "الدول المتاحة",
          description: "عرض الدول المتاحة للدراسة",
          editPath: "/admin/pages/home/countries"
        },
        {
          id: "testimonials",
          name: "آراء العملاء",
          description: "شهادات وآراء الطلاب السابقين",
          editPath: "/admin/pages/home/testimonials"
        },
        {
          id: "blog_previews",
          name: "مقالات المدونة",
          description: "عرض لأحدث المقالات من المدونة",
          editPath: "/admin/pages/home/blog-previews"
        },
        {
          id: "cta",
          name: "دعوة للتواصل",
          description: "قسم يحث الزائر على التواصل معنا",
          editPath: "/admin/pages/home/cta"
        },
      ]
    },
    {
      id: "about",
      name: "من نحن",
      path: "/about",
      icon: FileText,
      description: "صفحة تعريفية عن الشركة وخدماتها",
      sections: [
        {
          id: "about_hero",
          name: "مقدمة من نحن",
          description: "النص التعريفي الرئيسي",
          editPath: "/admin/pages/about/hero"
        },
        {
          id: "our_mission",
          name: "رسالتنا ورؤيتنا",
          description: "قسم يوضح رسالة ورؤية الشركة",
          editPath: "/admin/pages/about/mission"
        },
        {
          id: "our_team",
          name: "فريق العمل",
          description: "عرض أعضاء فريق العمل",
          editPath: "/admin/pages/about/team"
        },
      ]
    },
    {
      id: "contact",
      name: "اتصل بنا",
      path: "/contact",
      icon: Phone,
      description: "صفحة معلومات الاتصال ونموذج التواصل",
      sections: [
        {
          id: "contact_hero",
          name: "مقدمة اتصل بنا",
          description: "العنوان الرئيسي والنص التمهيدي",
          editPath: "/admin/pages/contact/hero"
        },
        {
          id: "contact_info",
          name: "معلومات الاتصال",
          description: "الهاتف والبريد الإلكتروني والعنوان",
          editPath: "/admin/pages/contact/info"
        },
        {
          id: "contact_form",
          name: "نموذج التواصل",
          description: "النموذج الذي يملأه الزوار للتواصل",
          editPath: "/admin/pages/contact/form"
        },
        {
          id: "map",
          name: "الخريطة",
          description: "خريطة الموقع",
          editPath: "/admin/pages/contact/map"
        },
      ]
    },
    {
      id: "countries",
      name: "الدول",
      path: "/countries",
      icon: Globe,
      description: "صفحة تعرض الدول المتاحة للدراسة",
      sections: [
        {
          id: "countries_hero",
          name: "مقدمة الدول",
          description: "العنوان الرئيسي والنص التمهيدي",
          editPath: "/admin/pages/countries/hero"
        },
        {
          id: "countries_list",
          name: "قائمة الدول",
          description: "عرض الدول المتاحة للدراسة",
          editPath: "/admin/pages/countries/list"
        },
      ]
    },
    {
      id: "blog",
      name: "المدونة",
      path: "/blog",
      icon: NewspaperIcon,
      description: "صفحة المقالات والأخبار",
      sections: [
        {
          id: "blog_hero",
          name: "مقدمة المدونة",
          description: "العنوان الرئيسي والنص التمهيدي",
          editPath: "/admin/pages/blog/hero"
        },
        {
          id: "blog_categories",
          name: "تصنيفات المدونة",
          description: "تصنيفات المقالات",
          editPath: "/admin/pages/blog/categories"
        },
        {
          id: "blog_posts",
          name: "المقالات",
          description: "قائمة المقالات",
          editPath: "/admin/pages/blog/posts"
        },
      ]
    },
  ];

  const handleQuickEdit = (sectionId: string) => {
    setEditingContent(sectionId);
    // In a real app, you would fetch content from the database
    setEditContent("هذا هو المحتوى الحالي للقسم المحدد. يمكنك تعديله هنا.");
    setIsEditDialogOpen(true);
  };

  const handleSaveContent = () => {
    toast({
      title: "تم حفظ التعديلات",
      description: "تم تحديث محتوى القسم بنجاح",
    });
    setIsEditDialogOpen(false);
  };

  const handleViewSection = (section: any) => {
    setSelectedSection(section);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">إدارة صفحات الموقع</h2>
      </div>

      <Tabs defaultValue={pages[0].id} className="space-y-4">
        <TabsList className="overflow-auto py-2">
          {pages.map((page) => (
            <TabsTrigger key={page.id} value={page.id} className="flex items-center">
              <page.icon className="ml-2 h-4 w-4" />
              {page.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{page.name}</h3>
                <p className="text-sm text-gray-500">{page.description}</p>
              </div>
              <div className="flex gap-2">
                <Link to={page.path} target="_blank">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="ml-2 h-4 w-4" />
                    عرض الصفحة
                  </Button>
                </Link>
                <Link to={`/admin/seo?page=${page.id}`}>
                  <Button variant="outline" size="sm">
                    <Settings className="ml-2 h-4 w-4" />
                    إعدادات SEO
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.sections.map((section) => (
                <Card key={section.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleQuickEdit(section.id)}
                    >
                      <PenTool className="ml-2 h-4 w-4" />
                      تعديل سريع
                    </Button>
                    
                    <Link to={section.editPath}>
                      <Button size="sm">
                        تعديل متقدم
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تعديل سريع للمحتوى</DialogTitle>
            <DialogDescription>
              يمكنك تعديل النص الأساسي للقسم المحدد هنا. للتعديلات المتقدمة استخدم خيار "تعديل متقدم".
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea 
              className="min-h-[200px]" 
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="أدخل المحتوى هنا..."
            />
            <p className="text-xs text-gray-500 mt-2">
              <AlertCircle className="inline ml-1 h-3 w-3" />
              ملاحظة: هذا تعديل سريع للنص فقط، للتحكم بالصور والتنسيق استخدم التعديل المتقدم.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveContent}>
              <Save className="ml-2 h-4 w-4" />
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
