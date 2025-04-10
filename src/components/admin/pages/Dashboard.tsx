
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, MessageSquare, Eye, BarChart2, TrendingUp, 
  ArrowUpRight, ArrowDownRight, FileText, Clock
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الزيارات اليومية</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground flex items-center mt-2">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />12.5%
              </span>
              زيادة منذ آخر يوم
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الاستشارات الجديدة</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground flex items-center mt-2">
              <span className="text-red-500 flex items-center mr-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />4%
              </span>
              انخفاض منذ آخر أسبوع
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مقالات المدونة</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-2">
              آخر مقال نُشر منذ 3 أيام
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستخدمون</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground flex items-center mt-2">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />9.2%
              </span>
              زيادة منذ آخر شهر
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>نشاط الزيارات</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t pt-4">
            <div className="text-center text-gray-400">
              <BarChart2 className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <p>مخطط الإحصائيات</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>آخر الاستشارات</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] overflow-auto border-t pt-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-0 last:pb-0 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">أحمد محمد</h4>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 ml-1" />
                    منذ {index} ساعات
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">استفسار حول الدراسة في بريطانيا</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    لم يتم الرد
                  </span>
                  <button className="text-xs text-blue-600 hover:underline">عرض التفاصيل</button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
