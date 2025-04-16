import { useParams, Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSectionTitle, getSectionDescription } from "@/components/admin/pages/utils/sectionUtils";
import { ContentEditor } from "@/components/admin/pages/components/ContentEditor";
import { WhatsAppSettings } from "@/components/admin/pages/components/WhatsAppSettings";

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

  const handleSave = () => {
    toast({
      title: "تم حفظ التغييرات",
      description: `تم تحديث محتوى ${getSectionTitle(sectionId)} بنجاح`,
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
              {getPageTitle()} - {getSectionTitle(sectionId)}
            </h2>
            <p className="text-gray-500 mt-1">{getSectionDescription(sectionId)}</p>
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
            <ContentEditor 
              content={content}
              onContentChange={setContent}
            />
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppSettings 
              whatsappNumber={whatsappNumber}
              whatsappMessage={whatsappMessage}
              onWhatsappNumberChange={setWhatsappNumber}
              onWhatsappMessageChange={setWhatsappMessage}
              onSave={handleSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
