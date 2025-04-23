
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Clock, Loader2 } from "lucide-react";
import { Consultation } from "../useConsultations";

interface StatusChangeDialogProps {
  consultation: Consultation | null;
  open: boolean;
  onClose: () => void;
  newStatus: "pending" | "replied" | "closed";
  setNewStatus: (status: "pending" | "replied" | "closed") => void;
  onChangeStatus: (newStatus: "pending" | "replied" | "closed") => void;
  isProcessing: boolean;
}

export const StatusChangeDialog = ({
  consultation,
  open,
  onClose,
  newStatus,
  setNewStatus,
  onChangeStatus,
  isProcessing,
}: StatusChangeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Clock className="ml-2 h-5 w-5" />
            تغيير حالة الاستشارة
          </DialogTitle>
          <DialogDescription>
            {consultation && `تغيير حالة استشارة ${consultation.name}`}
          </DialogDescription>
        </DialogHeader>
        
        {consultation && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                اختر الحالة الجديدة:
              </label>
              <Select 
                value={newStatus} 
                onValueChange={(value: "pending" | "replied" | "closed") => setNewStatus(value)}
                disabled={isProcessing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="replied">تم الرد</SelectItem>
                  <SelectItem value="closed">مغلق</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            إلغاء
          </Button>
          <Button onClick={() => onChangeStatus(newStatus)} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري التحديث...
              </>
            ) : (
              <>
                <Clock className="ml-2 h-4 w-4" />
                تحديث الحالة
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
