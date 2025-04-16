
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, Home, Lock, FileQuestion, Briefcase, Users, MessageSquare, Globe } from "lucide-react";
import { PageInfo } from "../types";

export const usePages = () => {
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
        {
          id: "processes",
          name: "خطوات العمل",
          description: "شرح خطوات التقديم للدراسة",
        },
        {
          id: "countries",
          name: "الدول المتاحة",
          description: "عرض الدول المتاحة للدراسة",
        },
        {
          id: "testimonials",
          name: "آراء العملاء",
          description: "تجارب وآراء الطلاب السابقين",
        }
      ]
    },
    {
      id: "about",
      name: "من نحن",
      path: "/about",
      icon: Users,
      description: "صفحة التعريف بالشركة",
      isActive: true,
      sections: [
        {
          id: "about-hero",
          name: "مقدمة من نحن",
          description: "النص التعريفي الرئيسي"
        },
        {
          id: "our-mission",
          name: "رسالتنا ورؤيتنا",
          description: "رسالة وأهداف الشركة"
        },
        {
          id: "our-team",
          name: "فريق العمل",
          description: "عرض أعضاء فريق العمل"
        }
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
        },
        {
          id: "services-list",
          name: "قائمة الخدمات",
          description: "تفاصيل خدماتنا المقدمة"
        },
        {
          id: "why-us",
          name: "لماذا نحن",
          description: "مميزات التعامل معنا"
        }
      ]
    },
    {
      id: "contact",
      name: "اتصل بنا",
      path: "/contact",
      icon: MessageSquare,
      description: "صفحة التواصل",
      isActive: true,
      sections: [
        {
          id: "contact-info",
          name: "معلومات التواصل",
          description: "بيانات الاتصال الرئيسية",
          contactInfo: {
            whatsapp: "+966500000000",
            email: "contact@example.com",
            phone: "+966500000000"
          }
        },
        {
          id: "contact-form",
          name: "نموذج التواصل",
          description: "نموذج إرسال الرسائل"
        },
        {
          id: "location",
          name: "موقعنا",
          description: "خريطة وعنوان المكتب"
        }
      ]
    },
    {
      id: "countries",
      name: "الدول",
      path: "/countries",
      icon: Globe,
      description: "صفحة الدول المتاحة للدراسة",
      isActive: true,
      sections: [
        {
          id: "countries-intro",
          name: "مقدمة الدول",
          description: "نظرة عامة على الدول المتاحة"
        },
        {
          id: "countries-list",
          name: "قائمة الدول",
          description: "تفاصيل الدول وفرص الدراسة"
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

  const { toast } = useToast();

  const createPage = (pageData: { name: string; path: string; description: string }) => {
    const newPage: PageInfo = {
      id: Date.now().toString(),
      name: pageData.name,
      path: pageData.path,
      icon: FileText,
      description: pageData.description,
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
    toast({
      title: "تم إنشاء الصفحة",
      description: `تم إنشاء صفحة ${newPage.name} بنجاح`
    });
    
    return newPage;
  };

  const togglePageStatus = (pageId: string) => {
    setPages(pages.map(page => 
      page.id === pageId 
        ? { ...page, isActive: !page.isActive }
        : page
    ));

    const page = pages.find(p => p.id === pageId);
    if (page) {
      toast({
        title: page.isActive ? "تم تعطيل الصفحة" : "تم تفعيل الصفحة",
        description: `تم ${page.isActive ? "تعطيل" : "تفعيل"} صفحة ${page.name} بنجاح`
      });
    }
  };

  return {
    pages,
    createPage,
    togglePageStatus
  };
};
