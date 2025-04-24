
import { useConsultationList } from "./hooks/useConsultationList";
import { useConsultationDialogs } from "./hooks/useConsultationDialogs";
import { useConsultationActions } from "./hooks/useConsultationActions";
import { useFormatDate } from "./hooks/useFormatDate";

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

  const formatDate = useFormatDate();

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
