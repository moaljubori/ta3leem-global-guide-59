
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Page, PageMeta } from "./types";

interface PageSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  page: Page;
  onUpdatePage: (settings: Partial<Page>) => void;
}

export const PageSettingsDialog = ({
  isOpen,
  onClose,
  page,
  onUpdatePage,
}: PageSettingsDialogProps) => {
  const [pageTitle, setPageTitle] = useState(page.title);
  const [pageSlug, setPageSlug] = useState(page.slug);
  const [pageDescription, setPageDescription] = useState(page.description);
  const [isInMainNav, setIsInMainNav] = useState(page.isInMainNav);
  const [navLabel, setNavLabel] = useState(page.navLabel || "");
  const [navOrder, setNavOrder] = useState(page.navOrder || 0);
  const [meta, setMeta] = useState<PageMeta>({
    ...page.meta,
  });

  const handleSave = () => {
    onUpdatePage({
      title: pageTitle,
      slug: pageSlug,
      description: pageDescription,
      isInMainNav,
      navLabel: isInMainNav ? navLabel : undefined,
      navOrder: isInMainNav ? navOrder : undefined,
      meta,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>إعدادات الصفحة</DialogTitle>
          <DialogDescription>
            تعديل إعدادات صفحة {page.title}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
            <TabsTrigger value="navigation">القائمة</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان الصفحة</Label>
              <Input
                id="title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">مسار الصفحة (URL)</Label>
              <Input
                id="slug"
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
              />
              <p className="text-xs text-gray-500">يجب أن يبدأ بـ "/"</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">وصف الصفحة</Label>
              <Textarea
                id="description"
                value={pageDescription}
                onChange={(e) => setPageDescription(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="navigation" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mainNav" 
                checked={isInMainNav}
                onCheckedChange={(checked) => setIsInMainNav(checked === true)}
              />
              <Label htmlFor="mainNav" className="mr-2">إضافة للقائمة الرئيسية</Label>
            </div>
            
            {isInMainNav && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="navLabel">عنوان القائمة</Label>
                  <Input
                    id="navLabel"
                    value={navLabel}
                    onChange={(e) => setNavLabel(e.target.value)}
                    placeholder="العنوان الذي سيظهر في القائمة"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="navOrder">ترتيب القائمة</Label>
                  <Input
                    id="navOrder"
                    type="number"
                    min={0}
                    value={navOrder}
                    onChange={(e) => setNavOrder(parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-gray-500">يتم ترتيب القائمة تصاعدياً حسب هذه القيمة</p>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">عنوان الصفحة (SEO)</Label>
              <Input
                id="metaTitle"
                value={meta.title}
                onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                placeholder="عنوان الصفحة الذي سيظهر في نتائج البحث"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">وصف الصفحة (SEO)</Label>
              <Textarea
                id="metaDescription"
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                placeholder="وصف الصفحة الذي سيظهر في نتائج البحث"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">الكلمات المفتاحية</Label>
              <Input
                id="metaKeywords"
                value={meta.keywords}
                onChange={(e) => setMeta({ ...meta, keywords: e.target.value })}
                placeholder="كلمات مفتاحية مفصولة بفواصل"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogImage">صورة المشاركة</Label>
              <Input
                id="ogImage"
                value={meta.ogImage || ''}
                onChange={(e) => setMeta({ ...meta, ogImage: e.target.value })}
                placeholder="رابط صورة المشاركة (Open Graph)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="canonicalUrl">الرابط القانوني</Label>
              <Input
                id="canonicalUrl"
                value={meta.canonicalUrl || ''}
                onChange={(e) => setMeta({ ...meta, canonicalUrl: e.target.value })}
                placeholder="الرابط القانوني للصفحة (Canonical URL)"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>حفظ الإعدادات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
