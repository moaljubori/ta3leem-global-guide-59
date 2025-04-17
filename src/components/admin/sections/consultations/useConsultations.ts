
import { useState, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

// Define types for our consultations
export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "pending" | "replied" | "closed";
  created_at: string;
}

const mockConsultations: Consultation[] = [
  {
    id: "1",
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "+966 50 123 4567",
    subject: "استفسار حول الدراسة في كندا",
    message: "أود الاستفسار عن إجراءات القبول في الجامعات الكندية وتكاليف الدراسة والمعيشة.",
    status: "pending",
    created_at: "2025-04-02T14:30:00Z",
  },
  {
    id: "2",
    name: "سارة خالد",
    email: "sarah@example.com",
    phone: "+966 55 987 6543",
    subject: "طلب معلومات عن المنح الدراسية",
    message: "أبحث عن منح دراسية متاحة لدراسة الهندسة في الولايات المتحدة. هل يمكنكم مساعدتي؟",
    status: "replied",
    created_at: "2025-04-01T09:15:00Z",
  },
  {
    id: "3",
    name: "عبد الله سعيد",
    email: "abdullah@example.com",
    phone: "+966 54 111 2222",
    subject: "تأشيرة الدراسة في بريطانيا",
    message: "أرغب في معرفة متطلبات الحصول على تأشيرة الدراسة في بريطانيا وكيفية التقديم.",
    status: "pending",
    created_at: "2025-03-30T16:45:00Z",
  },
  {
    id: "4",
    name: "فاطمة علي",
    email: "fatima@example.com",
    phone: "+966 56 333 4444",
    subject: "برامج اللغة الإنجليزية",
    message: "هل تقدمون برامج لتعلم اللغة الإنجليزية قبل بدء الدراسة الجامعية؟",
    status: "closed",
    created_at: "2025-03-28T11:20:00Z",
  },
  {
    id: "5",
    name: "خالد محمود",
    email: "khalid@example.com",
    phone: "+966 59 555 6666",
    subject: "السكن الطلابي",
    message: "أرغب في معرفة خيارات السكن الطلابي المتاحة في أستراليا والتكاليف التقريبية.",
    status: "replied",
    created_at: "2025-03-25T13:10:00Z",
  },
];

export const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);
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

  const filteredConsultations = useMemo(() => {
    return consultations.filter(consultation => {
      const matchesSearch = 
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultation.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [consultations, searchTerm, statusFilter]);

  const handleSendReply = useCallback(() => {
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
              ? { ...item, status: "replied" } 
              : item
          )
        );
        
        toast({
          title: "تم إرسال الرد بنجاح",
          description: `تم الرد على استفسار ${selectedConsultation.name}`,
        });
      }
      
      setReplyMessage("");
      setReplyDialogOpen(false);
      setIsProcessing(false);
    }, 300);
  }, [replyMessage, selectedConsultation, toast, isProcessing]);

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
      }
      
      setDeleteDialogOpen(false);
      setIsProcessing(false);
    }, 300);
  }, [selectedConsultation, toast, isProcessing]);

  const handleChangeStatus = useCallback(() => {
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

        // Also update the selected consultation to reflect the new status
        if (selectedConsultation) {
          setSelectedConsultation({ ...selectedConsultation, status: newStatus });
        }
      }
      
      setStatusChangeDialogOpen(false);
      setIsProcessing(false);
    }, 300);
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
    consultations: filteredConsultations,
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
    isProcessing
  };
};
