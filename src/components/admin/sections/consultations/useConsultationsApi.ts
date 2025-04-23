
import { useCallback } from "react";
import { useConsultationList } from "./hooks/useConsultationList";
import { useConsultationDialogs } from "./hooks/useConsultationDialogs";
import { useConsultationActions } from "./hooks/useConsultationActions";

export const useConsultationsApi = () => {
  const {
    consultations,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    refreshConsultations,
    setConsultations
  } = useConsultationList();

  const {
    selectedConsultation,
    replyDialogOpen,
    viewDialogOpen,
    deleteDialogOpen,
    statusChangeDialogOpen,
    replyMessage,
    setReplyMessage,
    newStatus,
    setNewStatus,
    closeDialog,
    handleViewConsultation,
    handleOpenReplyDialog,
    handleOpenDeleteDialog,
    handleOpenStatusChangeDialog
  } = useConsultationDialogs();

  const {
    isProcessing,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus
  } = useConsultationActions({
    selectedConsultation,
    setConsultations,
    closeDialog
  });

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

  return {
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
  };
};
