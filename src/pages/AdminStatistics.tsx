
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminStatistics = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إحصائيات الموقع</h2>
        <Card>
          <CardHeader>
            <CardTitle>لوحة الإحصائيات</CardTitle>
            <CardDescription>عرض إحصائيات الزوار والمستخدمين</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">سيتم عرض الإحصائيات هنا</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;
