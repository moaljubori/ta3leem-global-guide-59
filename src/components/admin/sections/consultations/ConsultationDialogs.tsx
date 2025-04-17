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
import { Mail, Send, Trash2 } from "lucide-react";
import { ConsultationStatusBadge } from "./ConsultationStatusBadge";
import { Consultation } from "./useConsultations";

interface ConsultationDialogsProps {
  selectedConsultation: Consultation | null;
  viewDialogOpen: boolean;
  replyDialogOpen: boolean;
  deleteDialogOpen: boolean;
  replyMessage: string;
  setReplyMessage: (message: string) => void;
  onCloseDialog: () => void;
  onSendReply: () => void;
  onDelete: () => void;
  formatDate: (date: string) => string;
  onOpenReplyDialog: () => void;
  onOpenDeleteDialog: () => void;
}

export const ConsultationDialogs = ({
  selectedConsultation,
  viewDialogOpen,
  replyDialogOpen,
  deleteDialogOpen,
  replyMessage,
  setReplyMessage,
  onCloseDialog,
  onSendReply,
  onDelete,
  formatDate,
  onOpenReplyDialog,
  onOpenDeleteDialog,
}: ConsultationDialogsProps) => {
  return (
    <>
      <Dialog open={viewDialogOpen} onOpenChange={onCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الاستشارة</DialogTitle>
            <DialogDescription>
              {selectedConsultation && `استشارة مقدمة من ${selectedConsultation.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedConsultation && (
            <div className="space-y-4">
              <div className="flex justify-between flex-wrap gap-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge className="ml-2">الاسم</Badge>
                    <span>{selectedConsultation.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="ml-2">البريد الإلكتروني</Badge>
                    <span>{selectedConsultation.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="ml-2">رقم الهاتف</Badge>
                    <span>{selectedConsultation.phone}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge className="ml-2">التاريخ</Badge>
                    <span>{formatDate(selectedConsultation.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="ml-2">الحالة</Badge>
                    <ConsultationStatusBadge status={selectedConsultation.status} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge>الموضوع</Badge>
                <p className="p-3 bg-gray-50 rounded-md">{selectedConsultation.subject}</p>
              </div>
              
              <div className="space-y-2">
                <Badge>الرسالة</Badge>
                <div className="p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {selectedConsultation.message}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button variant="outline" onClick={onCloseDialog}>
              إغلاق
            </Button>
            
            <div className="space-x-2 space-x-reverse">
              <Button variant="secondary" onClick={onOpenReplyDialog}>
                <Send className="ml-2 h-4 w-4" />
                إرسال رد
              </Button>
              
              <Button variant="destructive" onClick={onOpenDeleteDialog}>
                <Trash2 className="ml-2 h-4 w-4" />
                حذف
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={replyDialogOpen} onOpenChange={onCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Mail className="ml-2 h-5 w-5" />
              إرسال رد
            </DialogTitle>
            <DialogDescription>
              {selectedConsultation && `إرسال رد إلى ${selectedConsultation.name} (${selectedConsultation.email})`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedConsultation && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">الاستفسار الأصلي:</h4>
                <div className="p-3 bg-gray-50 rounded-md text-gray-700 text-sm">
                  <p className="font-medium mb-1">{selectedConsultation.subject}</p>
                  <p>{selectedConsultation.message}</p>
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
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={onCloseDialog}>
              إلغاء
            </Button>
            <Button onClick={onSendReply}>
              <Send className="ml-2 h-4 w-4" />
              إرسال الرد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={deleteDialogOpen} onOpenChange={onCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذه الاستشارة؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={onCloseDialog}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
