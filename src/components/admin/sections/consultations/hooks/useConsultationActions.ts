
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import { Consultation } from "../useConsultations";

interface UseConsultationActionsProps {
  selectedConsultation: Consultation | null;
  setConsultations: (consultations: Consultation[]) => void;
  closeDialog: () => void;
}

export const useConsultationActions = ({
  selectedConsultation,
  setConsultations,
  closeDialog
}: UseConsultationActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSendReply = useCallback(async (replyMessage: string) => {
    if (isProcessing || !selectedConsultation) return;
    
    if (!replyMessage.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة رد قبل الإرسال",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await apiClient.consultations.replyToConsultation(selectedConsultation.id, {
        reply: replyMessage,
      });
      
      toast({
        title: "تم إرسال الرد بنجاح",
        description: `تم الرد على استفسار ${selectedConsultation.name}`,
      });
      
      setConsultations(prev => 
        prev.map(item => 
          item.id === selectedConsultation.id 
            ? { ...item, status: "replied" } 
            : item
        )
      );
      
      closeDialog();
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "خطأ",
        description: "فشل في إرسال الرد",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedConsultation, toast, isProcessing, setConsultations, closeDialog]);

  const handleDeleteConsultation = useCallback(async () => {
    if (isProcessing || !selectedConsultation) return;
    
    setIsProcessing(true);
    
    try {
      await apiClient.consultations.deleteConsultation(selectedConsultation.id);
      
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الاستشارة من النظام",
      });
      
      setConsultations(prev => 
        prev.filter(item => item.id !== selectedConsultation.id)
      );
      
      closeDialog();
    } catch (error) {
      console.error("Error deleting consultation:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الاستشارة",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedConsultation, toast, isProcessing, setConsultations, closeDialog]);

  const handleChangeStatus = useCallback(async (newStatus: "pending" | "replied" | "closed") => {
    if (isProcessing || !selectedConsultation) return;
    
    setIsProcessing(true);
    
    try {
      await apiClient.consultations.updateConsultationStatus(selectedConsultation.id, {
        status: newStatus
      });
      
      toast({
        title: "تم تغيير الحالة بنجاح",
        description: `تم تغيير حالة الاستشارة إلى ${
          newStatus === "pending" ? "قيد الانتظار" : 
          newStatus === "replied" ? "تم الرد" : "مغلق"
        }`,
      });
      
      setConsultations(prev => 
        prev.map(item => 
          item.id === selectedConsultation.id 
            ? { ...item, status: newStatus } 
            : item
        )
      );
      
      closeDialog();
    } catch (error) {
      console.error("Error updating consultation status:", error);
      toast({
        title: "خطأ",
        description: "فشل في تغيير حالة الاستشارة",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedConsultation, toast, isProcessing, setConsultations, closeDialog]);

  return {
    isProcessing,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus
  };
};
