
import { Badge } from "@/components/ui/badge";
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
import { ConsultationStatusBadge } from "../ConsultationStatusBadge";
import { Consultation } from "../useConsultations";

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
          <div className="space-y-4">
            <div className="flex justify-between flex-wrap gap-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className="ml-2">الاسم</Badge>
                  <span>{consultation.name}</span>
                </div>
                <div className="flex items-center">
                  <Badge className="ml-2">البريد الإلكتروني</Badge>
                  <span>{consultation.email}</span>
                </div>
                <div className="flex items-center">
                  <Badge className="ml-2">رقم الهاتف</Badge>
                  <span>{consultation.phone}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className="ml-2">التاريخ</Badge>
                  <span>{formatDate(consultation.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <Badge className="ml-2">الحالة</Badge>
                  <ConsultationStatusBadge status={consultation.status} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge>الموضوع</Badge>
              <p className="p-3 bg-gray-50 rounded-md">{consultation.subject}</p>
            </div>
            
            <div className="space-y-2">
              <Badge>الرسالة</Badge>
              <div className="p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                {consultation.message}
              </div>
            </div>
          </div>
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
