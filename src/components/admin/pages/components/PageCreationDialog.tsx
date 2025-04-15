
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PageCreationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pageData: {
    name: string;
    path: string;
    description: string;
  };
  onPageDataChange: (data: {
    name: string;
    path: string;
    description: string;
  }) => void;
  onCreatePage: () => void;
}

export const PageCreationDialog = ({
  isOpen,
  onOpenChange,
  pageData,
  onPageDataChange,
  onCreatePage,
}: PageCreationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إنشاء صفحة جديدة</DialogTitle>
          <DialogDescription>
            قم بإدخال معلومات الصفحة الجديدة
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="page-name">اسم الصفحة</Label>
            <Input
              id="page-name"
              value={pageData.name}
              onChange={(e) => onPageDataChange({ ...pageData, name: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="page-path">مسار الصفحة (URL)</Label>
            <Input
              id="page-path"
              value={pageData.path}
              onChange={(e) => onPageDataChange({ ...pageData, path: e.target.value })}
              placeholder="/example-page"
            />
          </div>
          
          <div>
            <Label htmlFor="page-description">وصف الصفحة</Label>
            <Input
              id="page-description"
              value={pageData.description}
              onChange={(e) => onPageDataChange({ ...pageData, description: e.target.value })}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={onCreatePage}>إنشاء الصفحة</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
