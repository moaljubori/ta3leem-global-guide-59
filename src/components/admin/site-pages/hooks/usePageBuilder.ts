
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Globe, 
  Shield, 
  FileText 
} from "lucide-react";
import { Page, PageSection, SectionType } from "../types";

// Initial pages data
const initialPages: Page[] = [
  {
    id: "home",
    title: "الصفحة الرئيسية",
    slug: "/",
    description: "الصفحة الرئيسية للموقع",
    icon: Home,
    isActive: true,
    isInMainNav: true,
    navLabel: "الرئيسية",
    navOrder: 1,
    meta: {
      title: "تعليم عالمي - الصفحة الرئيسية",
      description: "خدمات التعليم العالمي للدراسة في الخارج",
      keywords: "تعليم، دراسة في الخارج، منح دراسية",
    },
    sections: [
      {
        id: "hero",
        title: "القسم الترحيبي",
        type: SectionType.Hero,
        content: `# تعليم عالمي
خدمات استشارية للدراسة في الخارج

تواصل معنا اليوم للحصول على استشارة مجانية`,
        isActive: true,
        order: 1,
      },
      {
        id: "services",
        title: "خدماتنا",
        type: SectionType.Cards,
        content: `# خدماتنا المميزة

## استشارات الدراسة في الخارج
نقدم استشارات متخصصة لاختيار أفضل وجهة دراسية تناسب تطلعاتك.

## تأمين القبولات
نساعدك في الحصول على قبولات من أفضل الجامعات العالمية.

## خدمات التأشيرات
دعم كامل في إجراءات الحصول على تأشيرات الدراسة.`,
        isActive: true,
        order: 2,
      },
      {
        id: "countries",
        title: "الدول المتاحة",
        type: SectionType.Gallery,
        content: `# الدول المتاحة للدراسة

## بريطانيا
جامعات عريقة وشهادات معترف بها عالمياً.

## أستراليا
جودة تعليمية عالية وبيئة دراسية مميزة.

## كندا
رسوم دراسية معقولة وفرص هجرة بعد التخرج.

## أمريكا
أفضل الجامعات العالمية وتنوع في التخصصات.`,
        isActive: true,
        order: 3,
      },
      {
        id: "testimonials",
        title: "آراء العملاء",
        type: SectionType.Testimonials,
        content: `# آراء عملائنا

## أحمد محمد
خريج جامعة مانشستر
"ساعدني فريق تعليم عالمي في تحقيق حلمي بالدراسة في بريطانيا"

## سارة أحمد
طالبة في جامعة تورنتو
"لولا دعمهم المتواصل لما تمكنت من الحصول على قبول وتأشيرة دراسية"

## عمر خالد
خريج جامعة سيدني
"استشاراتهم المتخصصة وفرت علي الكثير من الوقت والجهد"`,
        isActive: true,
        order: 4,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "about",
    title: "من نحن",
    slug: "/about",
    description: "صفحة التعريف بالشركة",
    icon: Users,
    isActive: true,
    isInMainNav: true,
    navLabel: "من نحن",
    navOrder: 2,
    meta: {
      title: "تعليم عالمي - من نحن",
      description: "تعرف على فريق عمل تعليم عالمي وخبراتنا",
      keywords: "تعليم عالمي، فريق العمل، خبرات",
    },
    sections: [
      {
        id: "about-hero",
        title: "عن الشركة",
        type: SectionType.Text,
        content: `# من نحن

شركة تعليم عالمي هي شركة متخصصة في تقديم الاستشارات التعليمية للطلاب الراغبين بالدراسة في الخارج. تأسست الشركة عام 2010 ولديها فريق من الخبراء والمستشارين المتخصصين في مجال التعليم الدولي.`,
        isActive: true,
        order: 1,
      },
      {
        id: "mission",
        title: "رؤيتنا ورسالتنا",
        type: SectionType.Text,
        content: `# رؤيتنا ورسالتنا

## رؤيتنا
أن نكون الخيار الأول للطلاب الراغبين بالدراسة في الخارج في منطقة الشرق الأوسط.

## رسالتنا
تقديم خدمات استشارية متميزة للطلاب الراغبين بالدراسة في الخارج وتسهيل رحلتهم التعليمية من البداية وحتى التخرج.`,
        isActive: true,
        order: 2,
      },
      {
        id: "team",
        title: "فريق العمل",
        type: SectionType.Cards,
        content: `# فريق العمل

## د. محمد العمري
المدير التنفيذي
خبرة أكثر من 15 عاماً في مجال التعليم الدولي

## أ. سارة الأحمد
مديرة قسم الاستشارات
خبرة في القبولات الجامعية والمنح الدراسية

## أ. فهد السالم
مستشار التأشيرات
متخصص في تأشيرات الدراسة والهجرة`,
        isActive: true,
        order: 3,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "services",
    title: "خدماتنا",
    slug: "/services",
    description: "صفحة الخدمات والحلول",
    icon: Briefcase,
    isActive: true,
    isInMainNav: true,
    navLabel: "خدماتنا",
    navOrder: 3,
    meta: {
      title: "تعليم عالمي - خدماتنا",
      description: "تعرف على الخدمات التي نقدمها للطلاب الراغبين بالدراسة في الخارج",
      keywords: "خدمات، استشارات تعليمية، قبولات جامعية، تأشيرات دراسية",
    },
    sections: [
      {
        id: "services-hero",
        title: "خدماتنا",
        type: SectionType.Hero,
        content: `# خدماتنا

نقدم مجموعة متكاملة من الخدمات الاستشارية للطلاب الراغبين بالدراسة في الخارج`,
        isActive: true,
        order: 1,
      },
      {
        id: "services-list",
        title: "قائمة الخدمات",
        type: SectionType.Features,
        content: `# خدماتنا المتميزة

## استشارات الدراسة في الخارج
نقدم استشارات متخصصة لاختيار أفضل وجهة دراسية تناسب تطلعاتك وميزانيتك.

## تأمين القبولات الجامعية
نساعدك في الحصول على قبولات من أفضل الجامعات العالمية المناسبة لتخصصك.

## خدمات التأشيرات
دعم كامل في إجراءات الحصول على تأشيرات الدراسة وتجهيز الملفات المطلوبة.

## البحث عن المنح الدراسية
مساعدتك في البحث عن أفضل المنح الدراسية المتاحة وإعداد طلبات التقديم.`,
        isActive: true,
        order: 2,
      },
      {
        id: "service-packages",
        title: "باقات الخدمات",
        type: SectionType.Cards,
        content: `# باقاتنا

## الباقة الأساسية
استشارة تعليمية + المساعدة في اختيار الجامعات المناسبة

## الباقة المتوسطة
استشارة تعليمية + تأمين قبولات جامعية + مراجعة ملف التأشيرة

## الباقة الشاملة
استشارة تعليمية + تأمين قبولات جامعية + إعداد ملف التأشيرة + متابعة شاملة`,
        isActive: true,
        order: 3,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "countries",
    title: "الدول",
    slug: "/countries",
    description: "صفحة الدول المتاحة للدراسة",
    icon: Globe,
    isActive: true,
    isInMainNav: true,
    navLabel: "الدول",
    navOrder: 4,
    meta: {
      title: "تعليم عالمي - الدول المتاحة للدراسة",
      description: "تعرف على الدول المتاحة للدراسة وميزات كل دولة",
      keywords: "دول الدراسة، بريطانيا، كندا، أستراليا، أمريكا",
    },
    sections: [
      {
        id: "countries-hero",
        title: "الدول المتاحة",
        type: SectionType.Hero,
        content: `# الدول المتاحة للدراسة

اكتشف مجموعة متنوعة من الدول التي يمكنك الدراسة فيها`,
        isActive: true,
        order: 1,
      },
      {
        id: "countries-list",
        title: "قائمة الدول",
        type: SectionType.Gallery,
        content: `# الدول المتاحة للدراسة

## بريطانيا
جامعات عريقة وشهادات معترف بها عالمياً.
[التفاصيل](/countries/uk)

## أستراليا
جودة تعليمية عالية وبيئة دراسية مميزة.
[التفاصيل](/countries/australia)

## كندا
رسوم دراسية معقولة وفرص هجرة بعد التخرج.
[التفاصيل](/countries/canada)

## أمريكا
أفضل الجامعات العالمية وتنوع في التخصصات.
[التفاصيل](/countries/usa)`,
        isActive: true,
        order: 2,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "contact",
    title: "تواصل معنا",
    slug: "/contact",
    description: "صفحة التواصل",
    icon: MessageSquare,
    isActive: true,
    isInMainNav: true,
    navLabel: "تواصل معنا",
    navOrder: 5,
    meta: {
      title: "تعليم عالمي - تواصل معنا",
      description: "تواصل معنا للاستفسار عن خدماتنا أو لحجز استشارة",
      keywords: "تواصل، استفسار، حجز استشارة",
    },
    sections: [
      {
        id: "contact-hero",
        title: "تواصل معنا",
        type: SectionType.Hero,
        content: `# تواصل معنا

نحن هنا للإجابة على جميع استفساراتك`,
        isActive: true,
        order: 1,
      },
      {
        id: "contact-form",
        title: "نموذج التواصل",
        type: SectionType.ContactForm,
        content: `# نموذج التواصل

يمكنك التواصل معنا من خلال تعبئة النموذج التالي:`,
        isActive: true,
        order: 2,
      },
      {
        id: "contact-info",
        title: "معلومات التواصل",
        type: SectionType.Text,
        content: `# معلومات التواصل

## العنوان
الرياض، المملكة العربية السعودية

## البريد الإلكتروني
info@global-education.com

## رقم الهاتف
+966 XX XXX XXXX`,
        isActive: true,
        order: 3,
      },
      {
        id: "location",
        title: "موقعنا",
        type: SectionType.Map,
        content: `# موقعنا

الرياض، المملكة العربية السعودية`,
        isActive: true,
        order: 4,
        settings: {
          latitude: 24.7136,
          longitude: 46.6753,
          zoom: 14,
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "privacy",
    title: "سياسة الخصوصية",
    slug: "/privacy",
    description: "سياسة الخصوصية وحماية البيانات",
    icon: Shield,
    isActive: true,
    isInMainNav: false,
    meta: {
      title: "تعليم عالمي - سياسة الخصوصية",
      description: "سياسة الخصوصية وحماية البيانات في تعليم عالمي",
      keywords: "سياسة الخصوصية، حماية البيانات",
    },
    sections: [
      {
        id: "privacy-content",
        title: "سياسة الخصوصية",
        type: SectionType.Text,
        content: `# سياسة الخصوصية

## المقدمة
تلتزم شركة تعليم عالمي بحماية خصوصية وبيانات مستخدمي الموقع.

## جمع البيانات
نقوم بجمع البيانات الشخصية التي تقدمها عند التسجيل في موقعنا أو عند الاتصال بنا.

## استخدام البيانات
نستخدم بياناتك الشخصية لتقديم خدماتنا وتحسين تجربتك على موقعنا.

## مشاركة البيانات
لا نشارك بياناتك الشخصية مع أي طرف ثالث دون موافقتك.`,
        isActive: true,
        order: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "terms",
    title: "الشروط والأحكام",
    slug: "/terms",
    description: "الشروط والأحكام العامة",
    icon: FileText,
    isActive: true,
    isInMainNav: false,
    meta: {
      title: "تعليم عالمي - الشروط والأحكام",
      description: "الشروط والأحكام العامة لاستخدام موقع تعليم عالمي",
      keywords: "شروط، أحكام، استخدام الموقع",
    },
    sections: [
      {
        id: "terms-content",
        title: "الشروط والأحكام",
        type: SectionType.Text,
        content: `# الشروط والأحكام

## مقدمة
تحكم هذه الشروط والأحكام استخدامك لموقع تعليم عالمي.

## حقوق الملكية الفكرية
جميع المحتويات المنشورة على الموقع هي ملك لشركة تعليم عالمي.

## المسؤولية
لا تتحمل شركة تعليم عالمي أي مسؤولية عن أي أضرار قد تنشأ من استخدام الموقع.

## التغييرات في الشروط والأحكام
نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت.`,
        isActive: true,
        order: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const usePageBuilder = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  
  const activePage = activePageId 
    ? pages.find(page => page.id === activePageId) 
    : null;
  
  const activeSection = activePage && activeSectionId 
    ? activePage.sections.find(section => section.id === activeSectionId) 
    : null;

  const setActivePage = useCallback((pageId: string | null) => {
    setActivePageId(pageId);
    setActiveSectionId(null);
  }, []);

  const setActiveSection = useCallback((sectionId: string | null) => {
    setActiveSectionId(sectionId);
  }, []);

  const createPage = useCallback((pageData: Partial<Page>) => {
    const newPage: Page = {
      id: Math.random().toString(36).substring(2, 9),
      title: pageData.title || "صفحة جديدة",
      slug: pageData.slug || `/custom-${Date.now()}`,
      description: pageData.description || "وصف الصفحة",
      icon: pageData.icon || FileText,
      isActive: pageData.isActive ?? true,
      isInMainNav: pageData.isInMainNav ?? false,
      navLabel: pageData.navLabel,
      navOrder: pageData.navOrder,
      meta: pageData.meta || {
        title: pageData.title || "صفحة جديدة",
        description: pageData.description || "وصف الصفحة",
        keywords: "",
      },
      sections: pageData.sections || [{
        id: Math.random().toString(36).substring(2, 9),
        title: "المحتوى الرئيسي",
        type: SectionType.Text,
        content: "# محتوى الصفحة الجديدة\n\nأضف المحتوى الخاص بك هنا.",
        isActive: true,
        order: 1,
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPages(prevPages => [...prevPages, newPage]);
    
    toast({
      title: "تم إنشاء الصفحة",
      description: `تم إنشاء صفحة "${newPage.title}" بنجاح`,
    });
    
    return newPage;
  }, [toast]);

  const updatePage = useCallback((pageId: string, pageData: Partial<Page>) => {
    setPages(prevPages => prevPages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          ...pageData,
          updatedAt: new Date().toISOString(),
        };
      }
      return page;
    }));
    
    toast({
      title: "تم تحديث الصفحة",
      description: `تم تحديث صفحة "${pageData.title || 'الصفحة'}" بنجاح`,
    });
  }, [toast]);

  const deletePage = useCallback((pageId: string) => {
    const pageToDelete = pages.find(page => page.id === pageId);
    
    if (!pageToDelete) {
      toast({
        title: "خطأ",
        description: "الصفحة المطلوبة غير موجودة",
        variant: "destructive",
      });
      return;
    }
    
    setPages(prevPages => prevPages.filter(page => page.id !== pageId));
    
    if (activePageId === pageId) {
      setActivePageId(null);
      setActiveSectionId(null);
    }
    
    toast({
      title: "تم حذف الصفحة",
      description: `تم حذف صفحة "${pageToDelete.title}" بنجاح`,
    });
  }, [pages, activePageId, toast]);

  const togglePageStatus = useCallback((pageId: string) => {
    setPages(prevPages => prevPages.map(page => {
      if (page.id === pageId) {
        const newStatus = !page.isActive;
        toast({
          title: newStatus ? "تم تفعيل الصفحة" : "تم تعطيل الصفحة",
          description: `تم ${newStatus ? 'تفعيل' : 'تعطيل'} صفحة "${page.title}" بنجاح`,
        });
        
        return {
          ...page,
          isActive: newStatus,
          updatedAt: new Date().toISOString(),
        };
      }
      return page;
    }));
  }, [toast]);

  const addSection = useCallback((pageId: string, sectionData: Partial<PageSection>) => {
    const page = pages.find(p => p.id === pageId);
    
    if (!page) {
      toast({
        title: "خطأ",
        description: "الصفحة المطلوبة غير موجودة",
        variant: "destructive",
      });
      return;
    }
    
    const maxOrder = page.sections.length > 0 
      ? Math.max(...page.sections.map(s => s.order)) 
      : 0;
    
    const newSection: PageSection = {
      id: Math.random().toString(36).substring(2, 9),
      title: sectionData.title || "قسم جديد",
      type: sectionData.type || SectionType.Text,
      content: sectionData.content || "# محتوى القسم الجديد\n\nأضف المحتوى الخاص بك هنا.",
      isActive: sectionData.isActive ?? true,
      order: maxOrder + 1,
      settings: sectionData.settings,
    };
    
    setPages(prevPages => prevPages.map(p => {
      if (p.id === pageId) {
        return {
          ...p,
          sections: [...p.sections, newSection],
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    }));
    
    toast({
      title: "تم إضافة القسم",
      description: `تم إضافة قسم "${newSection.title}" بنجاح`,
    });
    
    return newSection;
  }, [pages, toast]);

  const updateSection = useCallback((
    pageId: string, 
    sectionId: string, 
    sectionData: Partial<PageSection>
  ) => {
    setPages(prevPages => prevPages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                ...sectionData,
              };
            }
            return section;
          }),
          updatedAt: new Date().toISOString(),
        };
      }
      return page;
    }));
    
    toast({
      title: "تم تحديث القسم",
      description: `تم تحديث قسم "${sectionData.title || 'القسم'}" بنجاح`,
    });
  }, [toast]);

  const deleteSection = useCallback((pageId: string, sectionId: string) => {
    const page = pages.find(p => p.id === pageId);
    
    if (!page) {
      toast({
        title: "خطأ",
        description: "الصفحة المطلوبة غير موجودة",
        variant: "destructive",
      });
      return;
    }
    
    const sectionToDelete = page.sections.find(s => s.id === sectionId);
    
    if (!sectionToDelete) {
      toast({
        title: "خطأ",
        description: "القسم المطلوب غير موجود",
        variant: "destructive",
      });
      return;
    }
    
    setPages(prevPages => prevPages.map(p => {
      if (p.id === pageId) {
        return {
          ...p,
          sections: p.sections.filter(s => s.id !== sectionId),
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    }));
    
    if (activeSectionId === sectionId) {
      setActiveSectionId(null);
    }
    
    toast({
      title: "تم حذف القسم",
      description: `تم حذف قسم "${sectionToDelete.title}" بنجاح`,
    });
  }, [pages, activeSectionId, toast]);

  const reorderSections = useCallback((pageId: string, newOrder: string[]) => {
    setPages(prevPages => prevPages.map(page => {
      if (page.id === pageId) {
        const updatedSections = [...page.sections];
        
        // Update order based on new array order
        const sectionsWithNewOrder = updatedSections.map((section, index) => ({
          ...section,
          order: newOrder.findIndex(id => id === section.id) + 1,
        }));
        
        // Sort by new order
        sectionsWithNewOrder.sort((a, b) => a.order - b.order);
        
        return {
          ...page,
          sections: sectionsWithNewOrder,
          updatedAt: new Date().toISOString(),
        };
      }
      return page;
    }));
    
    toast({
      title: "تم إعادة ترتيب الأقسام",
      description: "تم إعادة ترتيب أقسام الصفحة بنجاح",
    });
  }, [toast]);

  const toggleSectionStatus = useCallback((pageId: string, sectionId: string) => {
    setPages(prevPages => prevPages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === sectionId) {
              const newStatus = !section.isActive;
              return {
                ...section,
                isActive: newStatus,
              };
            }
            return section;
          }),
          updatedAt: new Date().toISOString(),
        };
      }
      return page;
    }));
    
    const page = pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    
    if (page && section) {
      const newStatus = !section.isActive;
      toast({
        title: newStatus ? "تم تفعيل القسم" : "تم تعطيل القسم",
        description: `تم ${newStatus ? 'تفعيل' : 'تعطيل'} قسم "${section.title}" بنجاح`,
      });
    }
  }, [pages, toast]);

  return {
    pages,
    activePage,
    activeSection,
    setActivePage,
    setActiveSection,
    createPage,
    updatePage,
    deletePage,
    togglePageStatus,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    toggleSectionStatus,
  };
};
