import { useState, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ConsultationFilters } from "./consultations/ConsultationFilters";
import { ConsultationTable } from "./consultations/ConsultationTable";
import { ConsultationDialogs } from "./consultations/ConsultationDialogs";

const mockConsultations = [
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

export const AdminConsultations = () => {
  const [consultations, setConsultations] = useState(mockConsultations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

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
    if (!replyMessage.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة رد قبل الإرسال",
        variant: "destructive",
      });
      return;
    }
    
    setConsultations(prev => 
      prev.map(item => 
        item.id === selectedConsultation?.id 
          ? { ...item, status: "replied" } 
          : item
      )
    );
    
    toast({
      title: "تم إرسال الرد بنجاح",
      description: `تم الرد على استفسار ${selectedConsultation?.name}`,
    });
    
    setReplyMessage("");
    setReplyDialogOpen(false);
  }, [replyMessage, selectedConsultation, toast]);

  const handleDeleteConsultation = useCallback(() => {
    setConsultations(prev => 
      prev.filter(item => item.id !== selectedConsultation?.id)
    );
    
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف الاستشارة من النظام",
    });
    
    setDeleteDialogOpen(false);
  }, [selectedConsultation, toast]);

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
    setViewDialogOpen(false);
    setReplyDialogOpen(false);
    setDeleteDialogOpen(false);
    setTimeout(() => setSelectedConsultation(null), 300);
  }, []);

  const handleViewConsultation = useCallback((consultation: any) => {
    setSelectedConsultation(consultation);
    setViewDialogOpen(true);
  }, []);

  const handleOpenReplyDialog = useCallback(() => {
    setViewDialogOpen(false);
    setReplyDialogOpen(true);
  }, []);

  const handleOpenDeleteDialog = useCallback(() => {
    setViewDialogOpen(false);
    setDeleteDialogOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">إدارة الاستشارات</h2>
        <Button variant="outline" className="flex items-center">
          <RefreshCw className="ml-2 h-4 w-4" />
          تحديث
        </Button>
      </div>
      
      <ConsultationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <ConsultationTable
        consultations={filteredConsultations}
        onView={handleViewConsultation}
        onReply={(consultation) => {
          setSelectedConsultation(consultation);
          setReplyDialogOpen(true);
        }}
        onDelete={(consultation) => {
          setSelectedConsultation(consultation);
          setDeleteDialogOpen(true);
        }}
        formatDate={formatDate}
      />
      
      <ConsultationDialogs
        selectedConsultation={selectedConsultation}
        viewDialogOpen={viewDialogOpen}
        replyDialogOpen={replyDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        onCloseDialog={closeDialog}
        onSendReply={handleSendReply}
        onDelete={handleDeleteConsultation}
        formatDate={formatDate}
        onOpenReplyDialog={handleOpenReplyDialog}
        onOpenDeleteDialog={handleOpenDeleteDialog}
      />
    </div>
  );
};
