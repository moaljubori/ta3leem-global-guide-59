
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AdminCustomCode = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">أكواد إضافية</h2>
        <Card>
          <CardHeader>
            <CardTitle>أكواد مخصصة</CardTitle>
            <CardDescription>إضافة أكواد CSS أو JavaScript مخصصة للموقع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">أكواد CSS مخصصة</h3>
              <Textarea placeholder="أضف أكواد CSS هنا..." className="min-h-[150px] font-mono" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">أكواد JavaScript مخصصة</h3>
              <Textarea placeholder="أضف أكواد JavaScript هنا..." className="min-h-[150px] font-mono" />
            </div>
            <div className="flex justify-end">
              <Button>حفظ الأكواد</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomCode;
