
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Page } from "./types";

interface PageCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pageData: Partial<Page>;
  onPageDataChange: (data: Partial<Page>) => void;
  onCreatePage: () => void;
}

export const PageCreationDialog = ({
  isOpen,
  onClose,
  pageData,
  onPageDataChange,
  onCreatePage,
}: PageCreationDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePage();
  };

  const generateSlug = () => {
    if (!pageData.title) return;
    
    // Convert to lowercase, replace spaces with dashes, remove special chars
    const slug = pageData.title
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    
    onPageDataChange({
      ...pageData,
      slug: `/${slug}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>إنشاء صفحة جديدة</DialogTitle>
            <DialogDescription>
              قم بإدخال معلومات الصفحة الجديدة
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان الصفحة</Label>
              <Input
                id="title"
                value={pageData.title || ""}
                onChange={(e) => onPageDataChange({ ...pageData, title: e.target.value })}
                placeholder="أدخل عنوان الصفحة"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="slug">مسار الصفحة (URL)</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={generateSlug}
                  className="text-xs"
                  disabled={!pageData.title}
                >
                  إنشاء تلقائي
                </Button>
              </div>
              <Input
                id="slug"
                value={pageData.slug || ""}
                onChange={(e) => onPageDataChange({ ...pageData, slug: e.target.value })}
                placeholder="/example-page"
                required
              />
              <p className="text-xs text-gray-500">يجب أن يبدأ بـ "/"</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">وصف الصفحة</Label>
              <Textarea
                id="description"
                value={pageData.description || ""}
                onChange={(e) => onPageDataChange({ ...pageData, description: e.target.value })}
                placeholder="أدخل وصفاً مختصراً للصفحة"
                rows={3}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mainNav" 
                checked={pageData.isInMainNav || false}
                onCheckedChange={(checked) => 
                  onPageDataChange({ 
                    ...pageData, 
                    isInMainNav: checked === true 
                  })
                }
              />
              <Label htmlFor="mainNav" className="mr-2">إضافة للقائمة الرئيسية</Label>
            </div>

            {pageData.isInMainNav && (
              <div className="space-y-2">
                <Label htmlFor="navLabel">عنوان القائمة</Label>
                <Input
                  id="navLabel"
                  value={pageData.navLabel || ""}
                  onChange={(e) => onPageDataChange({ ...pageData, navLabel: e.target.value })}
                  placeholder="عنوان يظهر في القائمة"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">إنشاء الصفحة</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
