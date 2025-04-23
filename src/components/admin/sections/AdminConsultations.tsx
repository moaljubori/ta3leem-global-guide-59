
import { useState } from "react";
import { ConsultationTable } from "./consultations/ConsultationTable";
import { ConsultationFilters } from "./consultations/ConsultationFilters";
import { ConsultationDialogs } from "./consultations/ConsultationDialogs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useConsultationsApi } from "./consultations/useConsultationsApi";

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
    isLoading,
    refreshConsultations
  } = useConsultationsApi();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">طلبات الاستشارة</h2>
        <Button onClick={refreshConsultations} variant="outline" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري التحميل</>
          ) : (
            <>تحديث</>
          )}
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
        onReply={handleOpenReplyDialog}
        onDelete={handleOpenDeleteDialog}
        onChangeStatus={handleOpenStatusChangeDialog}
        formatDate={formatDate}
        disabled={isLoading}
      />

      <ConsultationDialogs
        viewDialogOpen={viewDialogOpen}
        replyDialogOpen={replyDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        statusChangeDialogOpen={statusChangeDialogOpen}
        selectedConsultation={selectedConsultation}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onCloseDialog={closeDialog}
        onOpenReplyDialog={handleOpenReplyDialog}
        onOpenDeleteDialog={handleOpenDeleteDialog}
        onOpenStatusChangeDialog={handleOpenStatusChangeDialog}
        onSendReply={handleSendReply}
        onDelete={handleDeleteConsultation}
        onChangeStatus={handleChangeStatus}
        formatDate={formatDate}
        isProcessing={isProcessing}
      />
    </div>
  );
};
