
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h2>
        <Card>
          <CardHeader>
            <CardTitle>قائمة المستخدمين</CardTitle>
            <CardDescription>إدارة حسابات المستخدمين والصلاحيات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">سيتم عرض قائمة المستخدمين هنا</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
