
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Mail, Send } from "lucide-react";
import { Consultation } from "../useConsultations";

interface ReplyConsultationDialogProps {
  consultation: Consultation | null;
  open: boolean;
  onClose: () => void;
  replyMessage: string;
  setReplyMessage: (message: string) => void;
  onSendReply: (replyMessage: string) => void;
  isProcessing: boolean;
}

export const ReplyConsultationDialog = ({
  consultation,
  open,
  onClose,
  replyMessage,
  setReplyMessage,
  onSendReply,
  isProcessing,
}: ReplyConsultationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="ml-2 h-5 w-5" />
            إرسال رد
          </DialogTitle>
          <DialogDescription>
            {consultation && `إرسال رد إلى ${consultation.name} (${consultation.email})`}
          </DialogDescription>
        </DialogHeader>
        
        {consultation && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">الاستفسار الأصلي:</h4>
              <div className="p-3 bg-gray-50 rounded-md text-gray-700 text-sm">
                <p className="font-medium mb-1">{consultation.subject}</p>
                <p>{consultation.message}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reply" className="text-sm font-medium">
                الرد:
              </label>
              <textarea 
                id="reply"
                className="w-full h-32 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="اكتب ردك هنا..."
                disabled={isProcessing}
              />
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            إلغاء
          </Button>
          <Button onClick={() => onSendReply(replyMessage)} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="ml-2 h-4 w-4" />
                إرسال الرد
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
