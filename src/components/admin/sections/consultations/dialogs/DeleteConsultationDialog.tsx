
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteConsultationDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  isProcessing: boolean;
}

export const DeleteConsultationDialog = ({
  open,
  onClose,
  onDelete,
  isProcessing,
}: DeleteConsultationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من رغبتك في حذف هذه الاستشارة؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الحذف...
              </>
            ) : (
              <>
                <Trash2 className="ml-2 h-4 w-4" />
                تأكيد الحذف
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
