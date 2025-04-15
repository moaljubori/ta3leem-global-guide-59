import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, Home, Lock, FileQuestion, Briefcase } from "lucide-react";
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
  };

  return {
    pages,
    createPage,
    togglePageStatus
  };
};
