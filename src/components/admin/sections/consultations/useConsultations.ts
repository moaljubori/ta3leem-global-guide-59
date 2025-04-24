
import { useState } from "react";
import { useConsultationList } from "./hooks/useConsultationList";
import { useConsultationActions } from "./hooks/useConsultationActions";
import { useFormatDate } from "./hooks/useFormatDate";
import { Consultation } from "./types/consultation";

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

  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [newStatus, setNewStatus] = useState<"pending" | "replied" | "closed">("pending");

  const {
    isProcessing,
    handleSendReply,
    handleDeleteConsultation,
    handleChangeStatus
  } = useConsultationActions(selectedConsultation, setConsultations);

  const formatDate = useFormatDate();

  const closeDialog = () => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setReplyDialogOpen(false);
    setDeleteDialogOpen(false);
    setStatusChangeDialogOpen(false);
    
    setTimeout(() => {
      setSelectedConsultation(null);
      setReplyMessage("");
      setNewStatus("pending");
    }, 300);
  };

  const handleViewConsultation = (consultation: Consultation) => {
    if (isProcessing) return;
    
    setSelectedConsultation(consultation);
    setNewStatus(consultation.status);
    setViewDialogOpen(true);
  };

  const handleOpenReplyDialog = () => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setTimeout(() => {
      setReplyDialogOpen(true);
    }, 100);
  };

  const handleOpenDeleteDialog = () => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 100);
  };

  const handleOpenStatusChangeDialog = () => {
    if (isProcessing) return;
    
    setViewDialogOpen(false);
    setTimeout(() => {
      setStatusChangeDialogOpen(true);
    }, 100);
  };

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
