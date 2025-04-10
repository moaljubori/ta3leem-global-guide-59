
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إعدادات الموقع</h2>
        
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="advanced">إعدادات متقدمة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>إعدادات الموقع الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">اسم الموقع</Label>
                  <Input id="site-name" defaultValue="تعليم عالمي" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-desc">وصف الموقع</Label>
                  <Textarea id="site-desc" defaultValue="منصة للدراسة في الخارج" />
                </div>
                <div className="flex justify-end">
                  <Button>حفظ الإعدادات</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
                <CardDescription>إعدادات شكل ومظهر الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">سيتم عرض إعدادات المظهر هنا</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات متقدمة</CardTitle>
                <CardDescription>إعدادات متقدمة للمستخدمين ذوي الخبرة</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">سيتم عرض الإعدادات المتقدمة هنا</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
