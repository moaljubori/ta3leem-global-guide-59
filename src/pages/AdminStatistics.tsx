
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, MessageSquare, Eye, TrendingUp, ArrowUpRight, 
  ArrowDownRight, FileText, BarChart2, Calendar 
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Sample data for charts
const visitData = [
  { name: "السبت", visits: 4000 },
  { name: "الأحد", visits: 3000 },
  { name: "الإثنين", visits: 2000 },
  { name: "الثلاثاء", visits: 2780 },
  { name: "الأربعاء", visits: 1890 },
  { name: "الخميس", visits: 2390 },
  { name: "الجمعة", visits: 3490 }
];

const monthlyVisitData = [
  { name: "يناير", visits: 4000 },
  { name: "فبراير", visits: 3000 },
  { name: "مارس", visits: 5000 },
  { name: "أبريل", visits: 2780 },
  { name: "مايو", visits: 3890 },
  { name: "يونيو", visits: 2390 },
  { name: "يوليو", visits: 3490 },
  { name: "أغسطس", visits: 4200 },
  { name: "سبتمبر", visits: 3800 },
  { name: "أكتوبر", visits: 4100 },
  { name: "نوفمبر", visits: 5200 },
  { name: "ديسمبر", visits: 4800 }
];

const usersByCountry = [
  { name: "السعودية", value: 400 },
  { name: "الإمارات", value: 300 },
  { name: "مصر", value: 300 },
  { name: "الأردن", value: 200 },
  { name: "الكويت", value: 150 }
];

const consultationByType = [
  { name: "دراسة", value: 35 },
  { name: "تأشيرات", value: 25 },
  { name: "سكن", value: 15 },
  { name: "تكاليف", value: 10 },
  { name: "أخرى", value: 15 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9b87f5'];

const AdminStatistics = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("week");
  const [currentVisitors, setCurrentVisitors] = useState(124);
  const [totalVisits, setTotalVisits] = useState(8725);
  const [totalConsultations, setTotalConsultations] = useState(142);
  const [totalArticles, setTotalArticles] = useState(45);
  const [totalUsers, setTotalUsers] = useState(573);

  // Simulate real-time visitors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVisitors(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(80, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">إحصائيات الموقع</h2>
          
          <Select value={timeRange} onValueChange={(value: "day" | "week" | "month" | "year") => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">اليوم</SelectItem>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الزوار الحاليون</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentVisitors}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-2">
                <span className="text-green-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />5%
                </span>
                مقارنة بالساعة الماضية
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الزيارات</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Intl.NumberFormat('ar-SA').format(totalVisits)}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-2">
                <span className="text-green-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />12.5%
                </span>
                زيادة منذ {timeRange === "day" ? "أمس" : timeRange === "week" ? "الأسبوع الماضي" : timeRange === "month" ? "الشهر الماضي" : "العام الماضي"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاستشارات</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConsultations}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-2">
                <span className="text-red-500 flex items-center mr-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />2.5%
                </span>
                انخفاض منذ {timeRange === "day" ? "أمس" : timeRange === "week" ? "الأسبوع الماضي" : timeRange === "month" ? "الشهر الماضي" : "العام الماضي"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المقالات</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalArticles}</div>
              <p className="text-xs text-muted-foreground mt-2">
                آخر مقال نُشر منذ 2 يوم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمون</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-2">
                <span className="text-green-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />8.2%
                </span>
                زيادة منذ {timeRange === "day" ? "أمس" : timeRange === "week" ? "الأسبوع الماضي" : timeRange === "month" ? "الشهر الماضي" : "العام الماضي"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="visitors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="visitors">الزيارات</TabsTrigger>
            <TabsTrigger value="demographics">البيانات الديموغرافية</TabsTrigger>
            <TabsTrigger value="content">تحليل المحتوى</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليل الزيارات</CardTitle>
                <CardDescription>عرض إحصائيات الزيارات حسب اليوم</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeRange === "month" || timeRange === "year" ? monthlyVisitData : visitData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visits" stroke="#9b87f5" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>مصادر الزيارات</CardTitle>
                  <CardDescription>من أين يأتي زوار موقعك؟</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'البحث', value: 45 },
                        { name: 'مباشر', value: 25 },
                        { name: 'إحالة', value: 18 },
                        { name: 'اجتماعي', value: 12 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#33C3F0" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>توزيع الأجهزة</CardTitle>
                  <CardDescription>الأجهزة التي يستخدمها الزوار</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'الهواتف', value: 55 },
                          { name: 'الحواسيب', value: 32 },
                          { name: 'الأجهزة اللوحية', value: 13 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'الهواتف', value: 55 },
                          { name: 'الحواسيب', value: 32 },
                          { name: 'الأجهزة اللوحية', value: 13 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="demographics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>توزيع المستخدمين حسب الدول</CardTitle>
                  <CardDescription>من أي الدول يأتي المستخدمون؟</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={usersByCountry}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {usersByCountry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>الفئات العمرية</CardTitle>
                  <CardDescription>توزيع المستخدمين حسب العمر</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '18-24', value: 20 },
                        { name: '25-34', value: 30 },
                        { name: '35-44', value: 25 },
                        { name: '45-54', value: 15 },
                        { name: '55+', value: 10 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>أنواع الاستشارات</CardTitle>
                  <CardDescription>توزيع الاستشارات حسب النوع</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={consultationByType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {consultationByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>أكثر المقالات قراءة</CardTitle>
                  <CardDescription>المقالات الأكثر شعبية في موقعك</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px] overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-2">#</th>
                        <th className="text-right py-2">العنوان</th>
                        <th className="text-right py-2">المشاهدات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, title: 'الدراسة في المملكة المتحدة: دليل شامل', views: 1245 },
                        { id: 2, title: 'كيفية الحصول على القبول في أفضل الجامعات الأمريكية', views: 989 },
                        { id: 3, title: 'تكاليف المعيشة للطلاب الدوليين في أستراليا', views: 875 },
                        { id: 4, title: 'فرص العمل بعد التخرج في كندا', views: 752 },
                        { id: 5, title: 'نصائح للحصول على تأشيرة الدراسة في أوروبا', views: 631 },
                        { id: 6, title: 'البرامج المميزة للدراسات العليا في آسيا', views: 524 },
                        { id: 7, title: 'المنح الدراسية المتاحة للطلاب العرب', views: 487 },
                      ].map(article => (
                        <tr key={article.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{article.id}</td>
                          <td className="py-2">{article.title}</td>
                          <td className="py-2">{article.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;
