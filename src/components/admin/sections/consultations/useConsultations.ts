
import { useConsultationList } from "./hooks/useConsultationList";
import { useConsultationActions } from "./hooks/useConsultationActions";
import { useConsultationDialogState } from "./hooks/useConsultationDialogState";
import { useFormatDate } from "./hooks/useFormatDate";

export { type Consultation } from "./types/consultation";

export const useConsultations = () => {
  const {
    consultations,
    setConsultations,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isLoading,
    refreshConsultations
  } = useConsultationList();

  const dialogState = useConsultationDialogState();

  const {
    isProcessing,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus
  } = useConsultationActions({
    selectedConsultation: dialogState.selectedConsultation,
    setConsultations,
    closeDialog: dialogState.closeDialog
  });

  const formatDate = useFormatDate();

  return {
    consultations,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    ...dialogState,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus,
    formatDate,
    isProcessing,
    isLoading,
    refreshConsultations
  };
};
