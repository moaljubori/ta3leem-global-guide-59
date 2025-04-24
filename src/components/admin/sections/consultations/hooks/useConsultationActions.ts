
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Consultation } from "../types/consultation";

interface ConsultationActionsProps {
  selectedConsultation: Consultation | null;
  setConsultations: React.Dispatch<React.SetStateAction<Consultation[]>>;
  closeDialog?: () => void;
}

export const useConsultationActions = ({
  selectedConsultation,
  setConsultations,
  closeDialog
}: ConsultationActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSendReply = useCallback((replyMessage: string) => {
    if (isProcessing) return;
    
    if (!replyMessage.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة رد قبل الإرسال",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      if (selectedConsultation) {
        setConsultations(prev => 
          prev.map(item => 
            item.id === selectedConsultation.id 
              ? { ...item, status: "replied", reply: replyMessage } 
              : item
          )
        );
        
        toast({
          title: "تم إرسال الرد بنجاح",
          description: `تم الرد على استفسار ${selectedConsultation.name}`,
        });

        if (closeDialog) {
          closeDialog();
        }
      }
      
      setIsProcessing(false);
    }, 300);
  }, [selectedConsultation, toast, isProcessing, setConsultations, closeDialog]);

  const handleDeleteConsultation = useCallback(() => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      if (selectedConsultation) {
        setConsultations(prev => 
          prev.filter(item => item.id !== selectedConsultation.id)
        );
        
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الاستشارة من النظام",
        });

        if (closeDialog) {
          closeDialog();
        }
      }
      
      setIsProcessing(false);
    }, 300);
  }, [selectedConsultation, toast, isProcessing, setConsultations, closeDialog]);

  const handleChangeStatus = useCallback((newStatus: "pending" | "replied" | "closed") => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      if (selectedConsultation) {
        setConsultations(prev => 
          prev.map(item => 
            item.id === selectedConsultation.id 
              ? { ...item, status: newStatus } 
              : item
          )
        );
        
        toast({
          title: "تم تغيير الحالة بنجاح",
          description: `تم تغيير حالة الاستشارة إلى ${
            newStatus === "pending" ? "قيد الانتظار" : 
            newStatus === "replied" ? "تم الرد" : "مغلق"
          }`,
        });

        if (closeDialog) {
          closeDialog();
        }
      }
      
      setIsProcessing(false);
    }, 300);
  }, [selectedConsultation, toast, isProcessing, setConsultations, closeDialog]);

  return {
    isProcessing,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus
  };
};
