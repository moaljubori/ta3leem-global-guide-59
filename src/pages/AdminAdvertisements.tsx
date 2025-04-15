import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Circle, Code, Eye, ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";

type Advertisement = {
  id: string;
  name: string;
  type: 'image' | 'code';
  content: string;
  location: string;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
};

const AdminAdvertisements = () => {
  const [ads, setAds] = useState<Advertisement[]>([
    {
      id: "1",
      name: "قبول جامعي مجاني - بانر علوي",
      type: "image",
      content: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      location: "home-header",
      isActive: true,
      startDate: "2025-03-15",
      endDate: "2025-04-15",
    },
    {
      id: "2",
      name: "منح دراسية - بانر في صفحة الدول",
      type: "image",
      content: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      location: "countries-sidebar",
      isActive: true,
      startDate: "2025-03-10",
      endDate: null,
    },
    {
      id: "3",
      name: "تتبع الطلب - كود جوجل",
      type: "code",
      content: "<script>console.log('تتبع الإعلان');</script>",
      location: "all-footer",
      isActive: false,
      startDate: "2025-04-01",
      endDate: "2025-05-01",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
  
  const { toast } = useToast();

  const pageLocations = [
    { value: "home-header", label: "الصفحة الرئيسية - أعلى" },
    { value: "home-sidebar", label: "الصفحة الرئيسية - الجانب" },
    { value: "blog-header", label: "المدونة - أعلى" },
    { value: "blog-sidebar", label: "المدونة - الجانب" },
    { value: "countries-sidebar", label: "صفحة الدول - الجانب" },
    { value: "all-footer", label: "جميع الصفحات - الأسفل" },
  ];

  const handleCreateAd = () => {
    setCurrentAd({
      id: "",
      name: "",
      type: "image",
      content: "",
      location: pageLocations[0].value,
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditAd = (ad: Advertisement) => {
    setCurrentAd({...ad});
    setIsEditDialogOpen(true);
  };

  const handleDeleteConfirmation = (ad: Advertisement) => {
    setCurrentAd(ad);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteAd = () => {
    if (currentAd) {
      setAds(ads.filter(ad => ad.id !== currentAd.id));
      toast({
        title: "تم الحذف ��نجاح",
        description: `تم حذف الإعلان "${currentAd.name}"`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSaveAd = () => {
    if (!currentAd || !currentAd.name || !currentAd.content) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (isCreateDialogOpen) {
      const newId = String(Math.max(...ads.map(ad => parseInt(ad.id)), 0) + 1);
      const newAd = { ...currentAd, id: newId };
      setAds([...ads, newAd]);
      
      toast({
        title: "تم الإضافة بنجاح",
        description: `تمت إضافة الإعلان "${currentAd.name}"`,
      });
      setIsCreateDialogOpen(false);
    } else if (isEditDialogOpen && currentAd.id) {
      setAds(ads.map(ad => ad.id === currentAd.id ? currentAd : ad));
      
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث الإعلان "${currentAd.name}"`,
      });
      setIsEditDialogOpen(false);
    }
  };

  const toggleAdStatus = (adId: string) => {
    setAds(ads.map(ad => {
      if (ad.id === adId) {
        return { ...ad, isActive: !ad.isActive };
      }
      return ad;
    }));
    
    const targetAd = ads.find(ad => ad.id === adId);
    if (targetAd) {
      toast({
        title: targetAd.isActive ? "تم إيقاف الإعلان" : "تم تفعيل الإعلان",
        description: `تم ${targetAd.isActive ? 'إيقاف' : 'تفعيل'} الإعلان "${targetAd.name}"`,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">إدارة الإعلانات</h2>
          <Button onClick={handleCreateAd}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة إعلان جديد
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">الإعلانات النشطة</TabsTrigger>
            <TabsTrigger value="inactive">الإعلانات المتوقفة</TabsTrigger>
            <TabsTrigger value="all">جميع الإعلانات</TabsTrigger>
          </TabsList>
          
          {/* Active Advertisements Tab */}
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>الإعلانات النشطة</CardTitle>
                <CardDescription>الإعلانات التي تظهر حاليًا على الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                {renderAdsTable(ads.filter(ad => ad.isActive))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Inactive Advertisements Tab */}
          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>الإعلانات المتوقفة</CardTitle>
                <CardDescription>الإعلانات التي تم إيقافها ولا تظهر على الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                {renderAdsTable(ads.filter(ad => !ad.isActive))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* All Advertisements Tab */}
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>جميع الإعلانات</CardTitle>
                <CardDescription>قائمة بجميع الإعلانات النشطة والمتوقفة</CardDescription>
              </CardHeader>
              <CardContent>
                {renderAdsTable(ads)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Advertisement Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة إعلان جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل الإعلان الجديد الذي تريد إضافته للموقع
            </DialogDescription>
          </DialogHeader>
          
          {currentAd && renderAdForm()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveAd}>إضافة الإعلان</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Advertisement Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تعديل الإعلان</DialogTitle>
            <DialogDescription>
              عدل تفاصيل الإعلان
            </DialogDescription>
          </DialogHeader>
          
          {currentAd && renderAdForm()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveAd}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Advertisement Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد حذف الإعلان</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          {currentAd && (
            <div className="py-4">
              <p className="font-semibold">{currentAd.name}</p>
              <p className="text-gray-500 text-sm mt-1">
                {currentAd.type === 'image' ? 'إعلان صورة' : 'إعلان برمجي'}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={handleDeleteAd}>
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );

  function renderAdsTable(adsList: Advertisement[]) {
    if (adsList.length === 0) {
      return (
        <div className="text-center py-10">
          <Circle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-gray-500">لا توجد إعلانات</p>
        </div>
      );
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">اسم الإعلان</TableHead>
            <TableHead className="text-right">النوع</TableHead>
            <TableHead className="text-right hidden md:table-cell">الموقع</TableHead>
            <TableHead className="text-right hidden lg:table-cell">تاريخ البدء</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-left">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adsList.map(ad => (
            <TableRow key={ad.id}>
              <TableCell className="font-medium">{ad.name}</TableCell>
              <TableCell>
                {ad.type === 'image' ? 
                  <span className="flex items-center text-blue-600">
                    <ImageIcon className="ml-1 h-4 w-4" /> صورة
                  </span> : 
                  <span className="flex items-center text-purple-600">
                    <Code className="ml-1 h-4 w-4" /> كود برمجي
                  </span>
                }
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {pageLocations.find(loc => loc.value === ad.location)?.label || ad.location}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {new Date(ad.startDate).toLocaleDateString('ar')}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch 
                    checked={ad.isActive} 
                    onCheckedChange={() => toggleAdStatus(ad.id)} 
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className={ad.isActive ? "text-green-600" : "text-gray-500"}>
                    {ad.isActive ? 'نشط' : 'متوقف'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteConfirmation(ad)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
  function renderAdForm() {
    if (!currentAd) return null;
    
    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم الإعلان</Label>
            <Input 
              id="name" 
              value={currentAd.name} 
              onChange={(e) => setCurrentAd({...currentAd, name: e.target.value})} 
              placeholder="أدخل اسمًا وصفيًا للإعلان"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">نوع الإعلان</Label>
              <Select 
                value={currentAd.type} 
                onValueChange={(value) => setCurrentAd({...currentAd, type: value as 'image' | 'code'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الإعلان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">إعلان صورة</SelectItem>
                  <SelectItem value="code">إعلان برمجي (كود)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">موقع الظهور</Label>
              <Select 
                value={currentAd.location} 
                onValueChange={(value) => setCurrentAd({...currentAd, location: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر موقع ظهور الإعلان" />
                </SelectTrigger>
                <SelectContent>
                  {pageLocations.map(loc => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            {currentAd.type === 'image' ? (
              <>
                <Label htmlFor="content">رابط الصورة</Label>
                <Input 
                  id="content" 
                  value={currentAd.content} 
                  onChange={(e) => setCurrentAd({...currentAd, content: e.target.value})} 
                  placeholder="أدخل رابط الصورة الإعلانية"
                />
                {currentAd.content && (
                  <div className="mt-2 p-2 border rounded">
                    <p className="text-xs mb-1">معاينة الصورة:</p>
                    <img 
                      src={currentAd.content} 
                      alt="معاينة الإعلان" 
                      className="h-32 object-contain mx-auto"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <Label htmlFor="content">كود الإعلان (HTML/JavaScript)</Label>
                <Textarea 
                  id="content" 
                  value={currentAd.content} 
                  onChange={(e) => setCurrentAd({...currentAd, content: e.target.value})} 
                  placeholder="أدخل كود الإعلان هنا"
                  className="font-mono text-sm"
                  rows={6}
                />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">تاريخ بدء الإعلان</Label>
              <Input 
                id="startDate" 
                type="date" 
                value={currentAd.startDate} 
                onChange={(e) => setCurrentAd({...currentAd, startDate: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">تاريخ انتهاء الإعلان (اختياري)</Label>
              <Input 
                id="endDate" 
                type="date" 
                value={currentAd.endDate || ''} 
                onChange={(e) => setCurrentAd({...currentAd, endDate: e.target.value || null})} 
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse pt-2">
            <Switch 
              id="isActive" 
              checked={currentAd.isActive} 
              onCheckedChange={(checked) => setCurrentAd({...currentAd, isActive: checked})} 
            />
            <Label htmlFor="isActive" className="cursor-pointer">تفعيل الإعلان فور إضافته</Label>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminAdvertisements;
