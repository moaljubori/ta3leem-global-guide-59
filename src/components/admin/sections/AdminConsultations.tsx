
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ConsultationFilters } from "./consultations/ConsultationFilters";
import { ConsultationTable } from "./consultations/ConsultationTable";
import { ConsultationDialogs } from "./consultations/ConsultationDialogs";
import { useConsultations } from "./consultations/useConsultations";
import { useCallback, useState } from "react";

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
    isProcessing
  } = useConsultations();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">إدارة الاستشارات</h2>
        <Button 
          variant="outline" 
          className="flex items-center" 
          onClick={handleRefresh}
          disabled={refreshing}
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
        formatDate={formatDate}
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
