
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ConsultationFilters } from "./consultations/ConsultationFilters";
import { ConsultationTable } from "./consultations/ConsultationTable";
import { ConsultationDialogs } from "./consultations/ConsultationDialogs";
import { useConsultations } from "./consultations/useConsultations";

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
    replyMessage,
    setReplyMessage,
    handleSendReply,
    handleDeleteConsultation,
    formatDate,
    closeDialog,
    handleViewConsultation,
    handleOpenReplyDialog,
    handleOpenDeleteDialog
  } = useConsultations();

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
