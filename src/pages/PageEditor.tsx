
import { useParams, Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSectionTitle, getSectionDescription } from "@/components/admin/pages/utils/sectionUtils";
import { ContentEditor } from "@/components/admin/pages/components/ContentEditor";
import { WhatsAppSettings } from "@/components/admin/pages/components/WhatsAppSettings";

// Mock contents for different sections
const pageSectionContents = {
  "hero": `# قسم البانر الرئيسي

تعديل محتوى البانر الرئيسي للصفحة الرئيسية. يمكنك تحديد:

- العنوان الرئيسي
- النص التوضيحي 
- نص الأزرار الرئيسية
- روابط الأزرار

## مثال للترميز

\`\`\`html
<div class="hero">
  <h1>نوفر لك أفضل خدمات الإرشاد التعليمي</h1>
  <p>مع فريق من المستشارين المتخصصين لمساعدتك في اختيار الدراسة المناسبة لك</p>
  <button>تواصل معنا اليوم</button>
</div>
\`\`\`
`,

  "about": `# قسم من نحن

تعديل محتوى قسم من نحن في الموقع. يمكنك تحديد:

- نبذة عن الشركة
- رؤيتنا ورسالتنا
- قيمنا

## مثال للمحتوى

نحن شركة متخصصة في تقديم الاستشارات التعليمية للطلاب الراغبين بالدراسة في الخارج.
تأسست الشركة عام 2010 على يد مجموعة من الخبراء في مجال التعليم الدولي.

### رؤيتنا
أن نكون الخيار الأول والأفضل للطلاب الراغبين بالدراسة في الخارج.

### رسالتنا
تقديم خدمات استشارية عالية الجودة تساعد الطلاب على تحقيق أحلامهم التعليمية.
`,

  "services": `# قسم خدماتنا

تعديل محتوى قسم الخدمات في الموقع. يمكنك تحديد:

- عناوين الخدمات
- وصف كل خدمة
- الأيقونات المستخدمة

## الخدمات الحالية

1. **الاستشارات التعليمية**  
   نقدم استشارات متخصصة حول اختيار الجامعات والتخصصات المناسبة.

2. **التقديم للجامعات**  
   نساعدك في إعداد وتقديم طلبات القبول للجامعات العالمية.

3. **خدمات التأشيرة**  
   نوفر المساعدة في استخراج تأشيرات الدراسة لمختلف الدول.

4. **خدمات السكن**  
   نساعدك في العثور على سكن مناسب في بلد الدراسة.
`,

  "testimonials": `# قسم آراء العملاء

تعديل محتوى قسم آراء العملاء في الموقع. يمكنك تحديد:

- الشهادات والتقييمات
- أسماء العملاء
- صور العملاء

## نماذج لآراء العملاء

> "حصلت على قبول من جامعة أحلامي بفضل خدمات الاستشارة المتميزة."  
> **أحمد محمد** - طالب في جامعة هارفارد

> "ساعدوني في اختيار التخصص المناسب لقدراتي وميولي."  
> **سارة خالد** - طالبة في جامعة تورنتو

> "تجربة رائعة وخدمة احترافية من البداية إلى النهاية."  
> **محمد عبدالله** - طالب في جامعة ملبورن
`,

  "contact": `# قسم التواصل معنا

تعديل محتوى قسم التواصل في الموقع. يمكنك تحديد:

- معلومات الاتصال
- رسالة الترحيب
- ساعات العمل

## معلومات التواصل

**العنوان:** شارع الملك فهد، الرياض، المملكة العربية السعودية  
**البريد الإلكتروني:** info@example.com  
**الهاتف:** +966 12 345 6789

### ساعات العمل
- الأحد إلى الخميس: 9:00 صباحاً - 5:00 مساءً
- الجمعة والسبت: مغلق
`,

  "footer": `# قسم تذييل الصفحة

تعديل محتوى تذييل الصفحة. يمكنك تحديد:

- روابط مهمة
- معلومات التواصل
- روابط وسائل التواصل الاجتماعي
- نص حقوق الملكية

## روابط مهمة

- الصفحة الرئيسية
- من نحن
- خدماتنا
- المدونة
- اتصل بنا
- سياسة الخصوصية
- الشروط والأحكام

## حقوق الملكية
© 2025 جميع الحقوق محفوظة
`,

  "blog": `# قسم المدونة

تعديل محتوى صفحة المدونة. يمكنك تحديد:

- عنوان الصفحة
- وصف المدونة
- التصنيفات الرئيسية

## وصف المدونة

مدونتنا هي مصدرك الأول للمعلومات حول الدراسة في الخارج. نقدم مقالات ونصائح قيمة للطلاب الراغبين بمواصلة دراستهم في أفضل الجامعات العالمية.

## التصنيفات

- نصائح للدراسة في الخارج
- منح دراسية
- تأشيرات الطلاب
- الحياة الطلابية
- تجارب الطلاب
`,

  "countries": `# قسم الدول

تعديل محتوى صفحة الدول. يمكنك تحديد:

- قائمة الدول
- وصف كل دولة
- معلومات الدراسة في كل دولة

## الدول المتاحة

### المملكة المتحدة
تعتبر وجهة دراسية مرموقة مع جامعات عريقة وبرامج متنوعة.

### الولايات المتحدة الأمريكية
تضم أكبر عدد من الجامعات المرموقة عالمياً وتقدم برامج في مختلف التخصصات.

### كندا
وجهة دراسية آمنة وذات تكلفة معقولة مع إمكانية العمل بعد التخرج.

### أستراليا
تقدم تعليماً عالي الجودة وبيئة معيشية ممتازة للطلاب الدوليين.
`,

  "privacy": `# سياسة الخصوصية

## مقدمة
نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدام موقعنا.

## جمع المعلومات
قد نجمع المعلومات التالية:
- الاسم
- معلومات الاتصال بما في ذلك عنوان البريد الإلكتروني
- المعلومات الديموغرافية مثل الرمز البريدي والتفضيلات والاهتمامات
- معلومات أخرى ذات صلة بالاستطلاعات والعروض

## استخدام المعلومات
نحتاج إلى هذه المعلومات لفهم احتياجاتك وتوفير خدمة أفضل لك، وعلى وجه الخصوص للأسباب التالية:
- الاحتفاظ بسجلات داخلية
- تحسين منتجاتنا وخدماتنا
- إرسال رسائل ترويجية عن منتجات جديدة أو عروض خاصة أو معلومات أخرى نعتقد أنها قد تكون مثيرة للاهتمام بالنسبة لك
`,

  "terms": `# الشروط والأحكام

## الشروط العامة
باستخدام هذا الموقع، فإنك توافق على الشروط والأحكام التالية، والتي قد يتم تعديلها أو استبدالها من وقت لآخر دون إشعار.

## استخدام المحتوى
جميع المحتويات المتوفرة على هذا الموقع بما في ذلك النصوص والرسومات والشعارات والأيقونات والصور ومقاطع الصوت والفيديو والبرامج هي ملك لنا أو لمرخصينا وهي محمية بموجب قوانين حقوق النشر الدولية.

## إخلاء المسؤولية
يتم توفير المعلومات على هذا الموقع "كما هي" دون أي ضمانات، صريحة أو ضمنية. لن نكون مسؤولين عن أي خسائر أو أضرار قد تنشأ عن استخدام هذا الموقع.

## القانون الحاكم
تخضع هذه الشروط والأحكام وتفسر وفقا لقوانين المملكة العربية السعودية، وتختص المحاكم السعودية بالفصل في أي نزاع ينشأ عن استخدام هذا الموقع.
`,
};

const PageEditor = () => {
  const { pageId, sectionId } = useParams();
  const [content, setContent] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("+966512345678");
  const [whatsappMessage, setWhatsappMessage] = useState("مرحباً، أود الاستفسار عن خدماتكم...");
  const { toast } = useToast();

  useEffect(() => {
    // Set content based on page and section
    const contentKey = sectionId || "";
    const sectionContent = pageSectionContents[contentKey] || `# محتوى ${getSectionTitle(sectionId)}\n\nقم بإضافة المحتوى هنا.`;
    setContent(sectionContent);
  }, [pageId, sectionId]);

  const getPageTitle = () => {
    switch (pageId) {
      case "home": return "الصفحة الرئيسية";
      case "about": return "من نحن";
      case "contact": return "تواصل معنا";
      case "countries": return "الدول";
      case "blog": return "المدونة";
      case "services": return "خدماتنا";
      case "privacy": return "سياسة الخصوصية";
      case "terms": return "الشروط والأحكام";
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
