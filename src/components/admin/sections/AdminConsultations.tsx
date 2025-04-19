
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ConsultationFilters } from "./consultations/ConsultationFilters";
import { ConsultationTable } from "./consultations/ConsultationTable";
import { ConsultationDialogs } from "./consultations/ConsultationDialogs";
import { useConsultations } from "./consultations/useConsultations";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const AdminConsultations = () => {
  const {
    consultations,
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
    refreshConsultations
  } = useConsultations();

  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = useCallback(() => {
    if (refreshing || isProcessing) return;
    
    setRefreshing(true);
    
    // Call the actual refresh function
    refreshConsultations();
    
    // Show refresh feedback
    toast({
      title: "تحديث البيانات",
      description: "تم تحديث قائمة الاستشارات بنجاح",
    });
    
    // Reset refreshing state after animation
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, [refreshing, isProcessing, refreshConsultations, toast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">إدارة الاستشارات</h2>
        <Button 
          variant="outline" 
          className="flex items-center" 
          onClick={handleRefresh}
          disabled={refreshing || isProcessing}
          aria-label="تحديث قائمة الاستشارات"
        >
          <RefreshCw className={`ml-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          تحديث
        </Button>
      </div>
      
      <ConsultationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        disabled={isProcessing}
      />
      
      <ConsultationTable
        consultations={consultations}
        onView={handleViewConsultation}
        onReply={(consultation) => {
          handleViewConsultation(consultation);
          handleOpenReplyDialog();
        }}
        onDelete={(consultation) => {
          handleViewConsultation(consultation);
          handleOpenDeleteDialog();
        }}
        onChangeStatus={(consultation) => {
          handleViewConsultation(consultation);
          handleOpenStatusChangeDialog();
        }}
        formatDate={formatDate}
        disabled={isProcessing}
      />
      
      <ConsultationDialogs
        selectedConsultation={selectedConsultation}
        viewDialogOpen={viewDialogOpen}
        replyDialogOpen={replyDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        statusChangeDialogOpen={statusChangeDialogOpen}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onCloseDialog={closeDialog}
        onSendReply={handleSendReply}
        onDelete={handleDeleteConsultation}
        onChangeStatus={handleChangeStatus}
        formatDate={formatDate}
        onOpenReplyDialog={handleOpenReplyDialog}
        onOpenDeleteDialog={handleOpenDeleteDialog}
        onOpenStatusChangeDialog={handleOpenStatusChangeDialog}
        isProcessing={isProcessing}
      />
    </div>
  );
};
