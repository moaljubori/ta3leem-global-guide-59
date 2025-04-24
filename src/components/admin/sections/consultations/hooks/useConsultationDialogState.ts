
import { useState } from "react";
import { Consultation } from "../types/consultation";

export const useConsultationDialogState = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [newStatus, setNewStatus] = useState<"pending" | "replied" | "closed">("pending");

  const closeDialog = () => {
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
    setSelectedConsultation(consultation);
    setNewStatus(consultation.status);
    setViewDialogOpen(true);
  };

  const handleOpenReplyDialog = () => {
    setViewDialogOpen(false);
    setTimeout(() => {
      setReplyDialogOpen(true);
    }, 100);
  };

  const handleOpenDeleteDialog = () => {
    setViewDialogOpen(false);
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 100);
  };

  const handleOpenStatusChangeDialog = () => {
    setViewDialogOpen(false);
    setTimeout(() => {
      setStatusChangeDialogOpen(true);
    }, 100);
  };

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
