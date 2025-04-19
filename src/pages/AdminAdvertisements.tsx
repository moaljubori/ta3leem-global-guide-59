
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Advertisement } from "@/components/admin/advertisements/types";
import { AdvertisementForm } from "@/components/admin/advertisements/AdvertisementForm";
import { AdvertisementsTable } from "@/components/admin/advertisements/AdvertisementsTable";
import { useAdvertisements } from "@/components/admin/advertisements/useAdvertisements";

const AdminAdvertisements = () => {
  const { ads, toggleAdStatus, deleteAd, saveAd } = useAdvertisements();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);

  const handleCreateAd = () => {
    setCurrentAd({
      id: "",
      name: "",
      type: "image",
      content: "",
      location: "home-header",
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

  const handleSaveAd = () => {
    if (currentAd && currentAd.name && currentAd.content) {
      saveAd(currentAd);
      setIsCreateDialogOpen(false);
      setIsEditDialogOpen(false);
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
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>الإعلانات النشطة</CardTitle>
                <CardDescription>الإعلانات التي تظهر حاليًا على الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <AdvertisementsTable 
                  advertisements={ads.filter(ad => ad.isActive)}
                  onEdit={handleEditAd}
                  onDelete={handleDeleteConfirmation}
                  onToggleStatus={toggleAdStatus}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>الإعلانات المتوقفة</CardTitle>
                <CardDescription>الإعلانات التي تم إيقافها ولا تظهر على الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <AdvertisementsTable 
                  advertisements={ads.filter(ad => !ad.isActive)}
                  onEdit={handleEditAd}
                  onDelete={handleDeleteConfirmation}
                  onToggleStatus={toggleAdStatus}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>جميع الإعلانات</CardTitle>
                <CardDescription>قائمة بجميع الإعلانات النشطة والمتوقفة</CardDescription>
              </CardHeader>
              <CardContent>
                <AdvertisementsTable 
                  advertisements={ads}
                  onEdit={handleEditAd}
                  onDelete={handleDeleteConfirmation}
                  onToggleStatus={toggleAdStatus}
                />
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
          
          {currentAd && <AdvertisementForm currentAd={currentAd} setCurrentAd={setCurrentAd} />}
          
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
          
          {currentAd && <AdvertisementForm currentAd={currentAd} setCurrentAd={setCurrentAd} />}
          
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
            <Button 
              variant="destructive" 
              onClick={() => {
                if (currentAd) {
                  deleteAd(currentAd);
                  setIsDeleteDialogOpen(false);
                }
              }}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAdvertisements;
