
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";

export interface CustomCode {
  code_id: string;
  name: string;
  html_code: string | null;
  css_code: string | null;
  js_code: string | null;
  location: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const useCustomCode = () => {
  const [customCodeList, setCustomCodeList] = useState<CustomCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCode, setCurrentCode] = useState<CustomCode | null>(null);
  const { toast } = useToast();

  const fetchCustomCode = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.customCode.getAllCustomCode();
      if (response.code_snippets) {
        setCustomCodeList(response.code_snippets);
      }
    } catch (error) {
      console.error("Error fetching custom code:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الأكواد المخصصة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCustomCode();
  }, [fetchCustomCode]);

  const saveCustomCode = async (code: CustomCode) => {
    try {
      await apiClient.customCode.saveCustomCode({
        name: code.name,
        html_code: code.html_code,
        css_code: code.css_code,
        js_code: code.js_code,
        location: code.location,
        is_published: code.is_published
      });

      if (code.code_id) {
        // Update existing code
        setCustomCodeList(prevCodes => 
          prevCodes.map(c => c.code_id === code.code_id ? code : c)
        );
        toast({
          title: "تم التحديث بنجاح",
          description: `تم تحديث الكود "${code.name}"`,
        });
      } else {
        // Refresh to get the new code with ID
        await fetchCustomCode();
        toast({
          title: "تم الإضافة بنجاح",
          description: `تمت إضافة الكود "${code.name}"`,
        });
      }
    } catch (error) {
      console.error("Error saving custom code:", error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الكود المخصص",
        variant: "destructive",
      });
    }
  };

  const deleteCustomCode = async (codeId: string) => {
    try {
      await apiClient.customCode.deleteCustomCode(codeId);
      setCustomCodeList(prevCodes => prevCodes.filter(c => c.code_id !== codeId));
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الكود المخصص",
      });
    } catch (error) {
      console.error("Error deleting custom code:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الكود المخصص",
        variant: "destructive",
      });
    }
  };

  return {
    customCodeList,
    isLoading,
    currentCode,
    setCurrentCode,
    saveCustomCode,
    deleteCustomCode,
    refreshCustomCode: fetchCustomCode
  };
};
