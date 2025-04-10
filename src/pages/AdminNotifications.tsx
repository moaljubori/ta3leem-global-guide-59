
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminNotifications = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إدارة الإشعارات</h2>
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الإشعارات</CardTitle>
            <CardDescription>إدارة إشعارات الموقع وإرسال إشعارات للمستخدمين</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">سيتم عرض إعدادات الإشعارات هنا</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
