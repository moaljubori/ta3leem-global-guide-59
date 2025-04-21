
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaFile } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  selectedFile: MediaFile | null;
  newFileName: string;
  setNewFileName: (name: string) => void;
  handleUpdateFileName: () => void;
};

export const MediaEditDialog = ({
  open,
  onOpenChange,
  selectedFile,
  newFileName,
  setNewFileName,
  handleUpdateFileName,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل اسم الملف</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="file-name" className="text-sm font-medium">
              اسم الملف
            </label>
            <Input
              id="file-name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleUpdateFileName}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
