
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { pageSectionContents } from "../data/pageContents";

export const usePageContent = (pageId?: string, sectionId?: string) => {
  const [content, setContent] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("+966500000000");
  const [whatsappMessage, setWhatsappMessage] = useState<string>("مرحباً، أود الاستفسار عن خدماتكم");
  const { toast } = useToast();

  // Load initial content based on section ID
  useEffect(() => {
    if (sectionId && pageSectionContents[sectionId]) {
      setContent(pageSectionContents[sectionId]);
    } else if (sectionId) {
      // If sectionId doesn't exist in our data, set default content
      setContent("# محتوى جديد\n\nأضف المحتوى الخاص بك هنا.");
    }
  }, [sectionId]);

  const handleSave = async () => {
    try {
      // In a real app, this would save to a database
      // For now, we're just simulating a successful save
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ التغييرات بنجاح",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء محاولة حفظ التغييرات",
        variant: "destructive",
      });
      
      return false;
    }
  };

  return {
    content,
    setContent,
    whatsappNumber,
    setWhatsappNumber,
    whatsappMessage,
    setWhatsappMessage,
    handleSave,
  };
};
