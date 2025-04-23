
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import { Consultation } from "./useConsultations";

export const useConsultationsApi = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "replied" | "closed">("all");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [newStatus, setNewStatus] = useState<"pending" | "replied" | "closed">("pending");

  const { toast } = useToast();

  const fetchConsultations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.consultations.getAllConsultations();
      if (response.consultations) {
        setConsultations(response.consultations);
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الاستشارات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const filteredConsultations = useCallback(() => {
    return consultations.filter(consultation => {
      const matchesSearch = 
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (consultation.subject && consultation.subject.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [consultations, searchTerm, statusFilter]);

  const handleSendReply = useCallback(async () => {
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
      
      // Update the status locally
      setConsultations(prev => 
        prev.map(item => 
          item.id === selectedConsultation.id 
            ? { ...item, status: "replied" } 
            : item
        )
      );
      
      setReplyMessage("");
      setReplyDialogOpen(false);
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
  }, [replyMessage, selectedConsultation, toast, isProcessing]);

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
      
      setDeleteDialogOpen(false);
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
  }, [selectedConsultation, toast, isProcessing]);

  const handleChangeStatus = useCallback(async () => {
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
      
      // Update the status locally
      setConsultations(prev => 
        prev.map(item => 
          item.id === selectedConsultation.id 
            ? { ...item, status: newStatus } 
            : item
        )
      );
      
      // Also update the selected consultation to reflect the new status
      setSelectedConsultation({ ...selectedConsultation, status: newStatus });
      setStatusChangeDialogOpen(false);
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
  }, [selectedConsultation, newStatus, toast, isProcessing]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  }, []);

  const closeDialog = useCallback(() => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setReplyDialogOpen(false);
    setDeleteDialogOpen(false);
    setStatusChangeDialogOpen(false);
    
    // Use setTimeout to ensure modal animation completes before clearing selection
    setTimeout(() => {
      setSelectedConsultation(null);
      setReplyMessage("");
      setNewStatus("pending");
    }, 300);
  }, [isProcessing]);

  const handleViewConsultation = useCallback((consultation: Consultation) => {
    if (isProcessing) return;
    
    setSelectedConsultation(consultation);
    setNewStatus(consultation.status); // Initialize the status change with current status
    setViewDialogOpen(true);
  }, [isProcessing]);

  const handleOpenReplyDialog = useCallback(() => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setTimeout(() => {
      setReplyDialogOpen(true);
    }, 100);
  }, [isProcessing]);

  const handleOpenDeleteDialog = useCallback(() => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 100);
  }, [isProcessing]);

  const handleOpenStatusChangeDialog = useCallback(() => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setTimeout(() => {
      setStatusChangeDialogOpen(true);
    }, 100);
  }, [isProcessing]);

  return {
    consultations: filteredConsultations(),
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedConsultation,
    replyDialogOpen,
    viewDialogOpen,
    deleteDialogOpen,
    statusChangeDialogOpen,
    replyMessage,
    setReplyMessage,
    newStatus,
    setNewStatus,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus,
    formatDate,
    closeDialog,
    handleViewConsultation,
    handleOpenReplyDialog,
    handleOpenDeleteDialog,
    handleOpenStatusChangeDialog,
    isProcessing,
    refreshConsultations: fetchConsultations
  };
};
