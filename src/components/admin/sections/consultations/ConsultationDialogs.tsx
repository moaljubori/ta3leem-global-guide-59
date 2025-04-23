
import { ViewConsultationDialog } from "./dialogs/ViewConsultationDialog";
import { ReplyConsultationDialog } from "./dialogs/ReplyConsultationDialog";
import { DeleteConsultationDialog } from "./dialogs/DeleteConsultationDialog";
import { StatusChangeDialog } from "./dialogs/StatusChangeDialog";
import { Consultation } from "./useConsultations";

interface ConsultationDialogsProps {
  selectedConsultation: Consultation | null;
  viewDialogOpen: boolean;
  replyDialogOpen: boolean;
  deleteDialogOpen: boolean;
  statusChangeDialogOpen?: boolean;
  replyMessage: string;
  setReplyMessage: (message: string) => void;
  newStatus?: "pending" | "replied" | "closed";
  setNewStatus?: (status: "pending" | "replied" | "closed") => void;
  onCloseDialog: () => void;
  onSendReply: (replyMessage: string) => void;
  onDelete: () => void;
  onChangeStatus?: (newStatus: "pending" | "replied" | "closed") => void;
  formatDate: (date: string) => string;
  onOpenReplyDialog: () => void;
  onOpenDeleteDialog: () => void;
  onOpenStatusChangeDialog?: () => void;
  isProcessing?: boolean;
}

export const ConsultationDialogs = ({
  selectedConsultation,
  viewDialogOpen,
  replyDialogOpen,
  deleteDialogOpen,
  statusChangeDialogOpen = false,
  replyMessage,
  setReplyMessage,
  newStatus = "pending",
  setNewStatus = () => {},
  onCloseDialog,
  onSendReply,
  onDelete,
  onChangeStatus = () => {},
  formatDate,
  onOpenReplyDialog,
  onOpenDeleteDialog,
  onOpenStatusChangeDialog = () => {},
  isProcessing = false,
}: ConsultationDialogsProps) => {
  return (
    <>
      <ViewConsultationDialog 
        consultation={selectedConsultation}
        open={viewDialogOpen}
        onClose={onCloseDialog}
        onOpenReplyDialog={onOpenReplyDialog}
        onOpenDeleteDialog={onOpenDeleteDialog}
        onOpenStatusChangeDialog={onOpenStatusChangeDialog}
        formatDate={formatDate}
        isProcessing={isProcessing}
      />
      
      <ReplyConsultationDialog
        consultation={selectedConsultation}
        open={replyDialogOpen}
        onClose={onCloseDialog}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        onSendReply={onSendReply}
        isProcessing={isProcessing}
      />
      
      <DeleteConsultationDialog
        open={deleteDialogOpen}
        onClose={onCloseDialog}
        onDelete={onDelete}
        isProcessing={isProcessing}
      />
      
      <StatusChangeDialog
        consultation={selectedConsultation}
        open={statusChangeDialogOpen}
        onClose={onCloseDialog}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onChangeStatus={onChangeStatus}
        isProcessing={isProcessing}
      />
    </>
  );
};
