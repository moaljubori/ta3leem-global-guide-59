import { useParams, Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PageEditor = () => {
  const { pageId, sectionId } = useParams();
  const [content, setContent] = useState("// محتوى القسم المحدد\nيمكنك تعديل هذا المحتوى هنا.");
  const [whatsappNumber, setWhatsappNumber] = useState("+1234567890");
  const [whatsappMessage, setWhatsappMessage] = useState("مرحباً، أود الاستفسار عن خدماتكم...");
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
    
    const sectionTitles: Record<string, string> = {
      "hero": "قسم الترحيب",
      "processes": "خطوات العمل",
      "countries": "الدول المتاحة",
      "testimonials": "آراء العملاء",
      "blog_previews": "مقالات المدونة",
      "cta": "دعوة للتواصل",
      
      "about_hero": "مقدمة من نحن",
      "our_mission": "رسالتنا ورؤيتنا",
      "our_team": "فريق العمل",
      
      "contact_hero": "مقدمة اتصل بنا",
      "contact_info": "معلومات الاتصال",
      "contact_form": "نموذج التواصل",
      "map": "الخريطة",

      "countries_hero": "مقدمة الدول",
      "countries_list": "قائمة الدول",
      
      "blog_hero": "مقدمة المدونة",
      "blog_categories": "تصنيفات المدونة",
      "blog_posts": "المقالات",
    };
    
    return sectionTitles[sectionId] || "قسم غير معروف";
  };

  const getSectionDescription = () => {
    if (!sectionId) return "تحرير كامل الصفحة";
    
    const sectionDescriptions: Record<string, string> = {
      "hero": "القسم الرئيسي في أعلى الصفحة مع الصورة والعنوان الرئيسي",
      "processes": "قسم يوضح خطوات عملية التقديم للدراسة في الخارج",
      "countries": "عرض الدول المتاحة للدراسة",
      "testimonials": "شهادات وآراء الطلاب السابقين",
      "blog_previews": "عرض لأحدث المقالات من المدونة",
      "cta": "قسم يحث الزائر على التواصل معنا",
      
      "about_hero": "النص التعريفي الرئيسي",
      "our_mission": "قسم يوضح رسالة ورؤية الشركة",
      "our_team": "عرض أعضاء فريق العمل",
      
      "contact_hero": "العنوان الرئيسي والنص التمهيدي",
      "contact_info": "الهاتف والبريد الإلكتروني والعنوان",
      "contact_form": "النموذج الذي يملأه الزوار للتواصل",
      "map": "خريطة الموقع",
      
      "countries_hero": "العنوان الرئيسي والنص التمهيدي",
      "countries_list": "عرض الدول المتاحة للدراسة",
      
      "blog_hero": "العنوان الرئيسي والنص التمهيدي",
      "blog_categories": "تصنيفات المقالات",
      "blog_posts": "قائمة المقالات",
    };
    
    return sectionDescriptions[sectionId] || "تحرير هذا القسم من الصفحة";
  };

  const handleSave = () => {
    toast({
      title: "تم حفظ التغييرات",
      description: `تم تحديث محتوى ${getSectionTitle()} بنجاح`,
    });
  };

  const generateWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${whatsappNumber.replace(/[+\s]/g, '')}?text=${encodedMessage}`;
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

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="content">تعديل المحتوى</TabsTrigger>
            <TabsTrigger value="whatsapp">إعداد زر واتساب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
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
          </TabsContent>

          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>إعداد زر التواصل عبر واتساب</CardTitle>
                <CardDescription>قم بتخصيص رقم الواتساب والرسالة الافتراضية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">رقم الواتساب (مع رمز الدولة)</Label>
                  <Input 
                    id="whatsapp-number" 
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-message">الرسالة الافتراضية</Label>
                  <Textarea 
                    id="whatsapp-message" 
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="اكتب رسالة افتراضية سيتم إرسالها عند النقر على الزر"
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">معاينة زر الواتساب</h3>
                  <div className="p-4 border rounded-md bg-gray-50">
                    <a 
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      تواصل معنا عبر واتساب
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    سيظهر هذا الزر في القسم المحدد مع توجيه الزائرين للتواصل المباشر عبر واتساب.
                  </p>
                </div>

                <div className="pt-2">
                  <Button onClick={handleSave} className="w-full">
                    <Save className="ml-2 h-4 w-4" />
                    حفظ إعدادات الواتساب
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
