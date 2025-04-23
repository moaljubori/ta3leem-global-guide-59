
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Send, Trash2 } from "lucide-react";
import { Consultation } from "../useConsultations";
import { ConsultationDetails } from "../dialog-content/ConsultationDetails";

interface ViewConsultationDialogProps {
  consultation: Consultation | null;
  open: boolean;
  onClose: () => void;
  onOpenReplyDialog: () => void;
  onOpenDeleteDialog: () => void;
  onOpenStatusChangeDialog: () => void;
  formatDate: (date: string) => string;
  isProcessing: boolean;
}

export const ViewConsultationDialog = ({
  consultation,
  open,
  onClose,
  onOpenReplyDialog,
  onOpenDeleteDialog,
  onOpenStatusChangeDialog,
  formatDate,
  isProcessing,
}: ViewConsultationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تفاصيل الاستشارة</DialogTitle>
          <DialogDescription>
            {consultation && `استشارة مقدمة من ${consultation.name}`}
          </DialogDescription>
        </DialogHeader>
        
        {consultation && (
          <ConsultationDetails
            consultation={consultation}
            formatDate={formatDate}
          />
        )}
        
        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            إغلاق
          </Button>
          
          <div className="space-x-2 space-x-reverse">
            <Button variant="secondary" onClick={onOpenStatusChangeDialog} disabled={isProcessing}>
              <Clock className="ml-2 h-4 w-4" />
              تغيير الحالة
            </Button>
            
            <Button variant="secondary" onClick={onOpenReplyDialog} disabled={isProcessing}>
              <Send className="ml-2 h-4 w-4" />
              إرسال رد
            </Button>
            
            <Button variant="destructive" onClick={onOpenDeleteDialog} disabled={isProcessing}>
              <Trash2 className="ml-2 h-4 w-4" />
              حذف
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
