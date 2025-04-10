
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminEmail = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">تحسين البريد الإلكتروني</h2>
        <Card>
          <CardHeader>
            <CardTitle>قوالب البريد الإلكتروني</CardTitle>
            <CardDescription>إدارة وتحرير قوالب البريد الإلكتروني</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">سيتم عرض قوالب البريد الإلكتروني هنا</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminEmail;
