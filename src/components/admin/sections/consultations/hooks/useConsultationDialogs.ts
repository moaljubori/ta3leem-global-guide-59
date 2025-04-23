
import { useState, useCallback } from "react";
import { Consultation } from "../useConsultations";

export const useConsultationDialogs = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [newStatus, setNewStatus] = useState<"pending" | "replied" | "closed">("pending");

  const closeDialog = useCallback(() => {
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
  }, []);

  const handleViewConsultation = useCallback((consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setNewStatus(consultation.status);
    setViewDialogOpen(true);
  }, []);

  const handleOpenReplyDialog = useCallback(() => {
    setViewDialogOpen(false);
    setTimeout(() => {
      setReplyDialogOpen(true);
    }, 100);
  }, []);

  const handleOpenDeleteDialog = useCallback(() => {
    setViewDialogOpen(false);
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 100);
  }, []);

  const handleOpenStatusChangeDialog = useCallback(() => {
    setViewDialogOpen(false);
    setTimeout(() => {
      setStatusChangeDialogOpen(true);
    }, 100);
  }, []);

  return {
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
  };
};
