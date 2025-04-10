
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminMedia = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إدارة الوسائط</h2>
        <Card>
          <CardHeader>
            <CardTitle>مكتبة الوسائط</CardTitle>
            <CardDescription>إدارة الصور والفيديوهات والملفات المستخدمة في الموقع</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">سيتم عرض مكتبة الوسائط هنا</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
